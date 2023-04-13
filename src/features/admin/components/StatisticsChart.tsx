import React, { FC } from 'react'
import { ResponsivePie } from '@nivo/pie'
import { PieTooltipProps } from '@nivo/pie/dist/types/types'

import { Box, Stack, Typography, useTheme } from '@mui/material'
import '../styles.scss'
interface StatisticsChartValues {
  id: string
  label: string
  value: number
  color: string
  percentage: string
}

const StatisticsTooltip: FC<PieTooltipProps<StatisticsChartValues>> = ({ datum }) => {
  const theme = useTheme()
  const { id, label, value, color, data } = datum
  return (
    <Box
      bgcolor={theme.palette.background.default}
      border="1px solid"
      borderColor={theme.palette.divider}
      borderRadius="8px"
      p={1}
      display="flex"
      gap={2}
      alignItems="center"
    >
      <Box width="10px" height="10px" bgcolor={color} borderRadius="2px" />
      <Typography fontSize={14} color="text.secondary">
        {label}: <span style={{ color: theme.palette.text.primary, fontWeight: 500 }}>{data.percentage}</span>
      </Typography>
    </Box>
  )
}

interface StatisticsChartProps {
  data: StatisticsChartValues[]
  count?: number
  enableLabels?: boolean
  lined?: string[]
  labelColor?: string
}
export const StatisticsChart: FC<StatisticsChartProps> = ({ data, count, enableLabels = false, lined, labelColor }) => {
  const theme = useTheme()
  if (!data) {
    return <>Loading...</>
  }

  return (
    <Box height="325px" minHeight={325} position="relative">
      <ResponsivePie
        theme={{
          fontFamily: 'Inter, "sans-serif"',
          fontSize: 16,
          textColor: labelColor || theme.palette.text.primary
        }}
        data={data}
        colors={{ datum: 'data.color' }}
        margin={{ top: 15, right: 30, bottom: 40, left: 30 }}
        startAngle={-180}
        innerRadius={0.6}
        cornerRadius={3}
        onClick={datum => {
          console.log(datum)
        }}
        arcLabel={e => e.data.percentage}
        activeOuterRadiusOffset={4}
        activeInnerRadiusOffset={2}
        borderColor={theme.palette.divider}
        tooltip={StatisticsTooltip}
        enableArcLinkLabels={false}
        enableArcLabels={enableLabels}
        defs={[
          {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            rotation: -45,
            lineWidth: 6,
            spacing: 20
          }
        ]}
        fill={
          lined &&
          lined.map(id => ({
            match: {
              id
            },
            id: 'lines'
          }))
        }
      />
      {count && (
        <Box
          position="absolute"
          top="50%"
          left="50%"
          textAlign="center"
          sx={{ pointerEvents: 'none', transform: 'translate(-50%,-80%)' }}
        >
          <Typography fontWeight={600} fontSize={24} color="text.secondary">
            {count}
          </Typography>
        </Box>
      )}
      <Stack
        direction="row"
        justifyContent="center"
        position="absolute"
        left={20}
        bottom={10}
        sx={{ userSelect: 'none' }}
        gap={3}
      >
        {data.map(item => (
          <Stack direction="row" alignItems="center" gap={1} key={item.id}>
            <Box width="10px" height="10px" bgcolor={item.color} borderRadius="2px" />
            <Typography fontSize={12} color="text.secondary">
              {item.label}: {item.value}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Box>
  )
}

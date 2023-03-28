import { FC, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
/* ui */
import { Button, Grid, Typography } from '@mui/material'
import CookieOutlinedIcon from '@mui/icons-material/CookieOutlined'
/* logic */
import { useAppDispatch, useAppSelector } from 'application/store'
import { selectIsAcceptCookie, setAcceptCookie } from 'features/users/services'
import { getIsAuthorizationRoute } from 'shared/utils/getIsAuthorizationRoute'
import 'shared/styles/animation.css'

export const CookieBanner: FC = () => {
  const location = useLocation()
  const nodeRef = useRef(null)
  const showBanner = useAppSelector(selectIsAcceptCookie)
  const dispatch = useAppDispatch()

  const acceptCookie = () => {
    dispatch(setAcceptCookie())
  }

  if (getIsAuthorizationRoute(location.pathname)) {
    return null
  }
  return (
    <CSSTransition in={!showBanner} nodeRef={nodeRef} classNames="cookie-banner" unmountOnExit timeout={300}>
      <Grid
        ref={nodeRef}
        container
        component="footer"
        sx={{
          p: 1,
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 3,
          backgroundColor: 'background.paper',
          alignItems: 'center',
          gap: { xs: 2, md: 0 },
          justifyContent: 'center',
          borderTop: '1px solid',
          borderTopColor: 'primary.border',
          userSelect: 'none'
        }}
      >
        <Grid item xs={12} md={0.5} sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}>
          <CookieOutlinedIcon />
        </Grid>
        <Grid item xs={12} md={10.5} sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}>
          <Typography
            variant="body1"
            fontWeight={500}
            sx={{ width: '85%', textAlign: { xs: 'center', md: 'start' }, fontSize: 12 }}
          >
            Please be aware that this awesome cookies banner informs you that this awesome website uses cookies. Why?
            Because cookies are an awesome delight of course!
          </Typography>
        </Grid>
        <Grid item xs={12} md={1} sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' } }}>
          <Button variant="contained" sx={{ fontWeight: 600 }} size="small" onClick={acceptCookie}>
            OK
          </Button>
        </Grid>
      </Grid>
    </CSSTransition>
  )
}

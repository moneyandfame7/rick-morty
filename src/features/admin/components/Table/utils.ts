import { RecentUsers } from 'features/admin/type'
import { Column, NeedToFormatValues } from '.'
import _ from 'lodash'

/* Прибирає обʼєкт, у якого поле field дорівнює вхідному параметру */
function excludeByFields<T>(arr: Column[], excludedFields: Array<keyof T>): Column[] {
  return arr.filter(item => {
    for (const field of excludedFields) {
      if (item.field === field) {
        return false
      }
    }
    return true
  })
}

function formatValues(
  unformattedRows: _.Omit<RecentUsers, keyof RecentUsers>[],
  needToFormat: Array<NeedToFormatValues>
) {
  return unformattedRows.map(row => {
    const formatted = needToFormat.map(format => ({
      [format.field]: format.implement(row[format.field as keyof typeof row])
    }))
    const transformedFormattedValues = formatted.reduce((acc, curr) => Object.assign(acc, curr), {})
    return {
      ...row,
      ...transformedFormattedValues
    }
  })
}

function transformData<T extends object>(
  data: T[],
  excludeKey: Array<keyof T>,
  needToFormat: Array<NeedToFormatValues>
) {
  /* заготовка колонок */
  const unexcludedColumns = Object.keys(data[0]).map(key => ({
    field: key,
    /* Capitalized word */
    headerName: key.replace(/_/g, ' ').replace(/(?:^|\s)\S/g, (match: string) => match.toUpperCase())
  }))

  const columns = excludeByFields<T>(unexcludedColumns, excludeKey)

  const unformattedRows = data.map(user => _.omit(user, excludeKey))

  /* needToFormat - масив обʼєктів з функцію, і полем, який потрібно форматувати */
  const rows = formatValues(unformattedRows, needToFormat)

  return {
    columns,
    rows
  }
}

export { transformData }

import React from 'react'
import { Grid } from 'styled-system/jsx'

export const BaseLayout: React.FC<React.PropsWithChildren<{}>> = (props) => {
  return (
    <Grid width="100vw" justifyItems="start" bg="grey.light" minHeight="100vh">
      {props.children}
    </Grid>
  )
}

import React from 'react'
import { Button, Result } from 'antd';

interface eventsProps {
    subTitle: string
}

const NoResult: React.FC<eventsProps> = ({subTitle}: eventsProps) => {
  return (
    <div>
        <Result
        status="404"
        title="404"
        subTitle={subTitle}
        extra={<Button type="primary">Back Home</Button>}/>
    </div>
  )
}

export default NoResult
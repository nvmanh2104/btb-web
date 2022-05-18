import React from 'react'
import {Spin} from 'antd'
import Icon from '@ant-design/icons';

const LoadingIndicator = ({style, content, isFetching, children}) => (
    <Spin size="large"
          spinning={isFetching}
          tip={`${content || 'Đang tải'}...`}
          style={{maxHeight: '100%', textAlign: 'center', ...style}}
          indicator={<Icon type="loading-3-quarters" style={{frontSize: 30}} spin />}
    >
        {children}
    </Spin>
)

export default LoadingIndicator
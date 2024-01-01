import { Col, Flex, Row } from 'antd'
import React from 'react'
import { Button, Dropdown, FormSection, TextInput } from '../Shared'
import { ButtonType, IconType } from '@/types'

const StepDetail = () => {
    return (
        <Flex vertical style={{ width: '560px' }}>
            <Button name='Back' leftIcon={IconType.BackArrow} type={ButtonType.Secondary} />
            <Flex style={{width:'100%'}}>
                <FormSection title="Transaction Details">
                    <Row style={{ width: '100%' }} justify={'space-between'}>
                        <Col span={11}>
                            <TextInput name='itemName' label='Item name' />
                        </Col>
                        <Col span={11}>
                            <TextInput name='price' label='Price(USD)' />
                        </Col>
                    </Row>
                    <Dropdown name='itemCategory' label='Item category' options={[{value:'123',label:'Item2'}]}/>
                </FormSection>
            </Flex>
        </Flex>
    )
}

export default StepDetail
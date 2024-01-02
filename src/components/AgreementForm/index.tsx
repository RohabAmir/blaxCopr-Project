'use client'
import { Flex } from 'antd'
import React, { FC, ReactNode } from 'react'
import styles from "./style.module.scss"
import { ButtonType, IconType } from '@/types'
import { Button, VerifyProfileBar } from '../Shared'
import Title from 'antd/es/typography/Title'
import StepAgreement from './StepAgreement'

// interface IAgreementForm {
//     children: ReactNode
// }
const AgreementForm: FC = () => {
    return (
        <Flex vertical className="w-full" align='flex-start'>
            <VerifyProfileBar />
            <Button name='Back' leftIcon={IconType.BackArrow} type={ButtonType.Secondary} />
            <Flex justify='space-between' align='center' className='w-full'>
                <Flex>
                    <Title level={3}>Contract Name</Title>
                    {/* <Text>Transaction</Text> */}
                    <span></span>
                    <span></span>
                </Flex>
                <Flex gap={20} align='center' justify='center'>
                    <div>
                        Buyer
                    </div>
                    <div>
                        Buyer
                    </div>
                    <div>
                        Buyer
                    </div>
                </Flex>
            </Flex>
            <Flex vertical align='center'>
                {/* <Stepper></Stepper> */}
                <Flex vertical align='center'>
                    <StepAgreement/>
                </Flex>

            </Flex>
        </Flex>
    )
}

export default AgreementForm
// LoginButton.stories.ts|tsx

import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import LoginButton from './LoginButton'

export default {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'SneanerPlug/LoginButton',
    component: LoginButton,
} as ComponentMeta<typeof LoginButton>

export const Primary: ComponentStory<typeof LoginButton> = () => (
    <LoginButton>Login</LoginButton>
)

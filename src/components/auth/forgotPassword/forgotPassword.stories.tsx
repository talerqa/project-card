import type {Meta, StoryObj} from '@storybook/react'

import {ForgotPassword} from './forgotPassword.tsx'
import {
  reactRouterParameters,
  withRouter
} from "storybook-addon-react-router-v6";

const meta = {
  title: 'Auth/ForgotPassword',
  component: ForgotPassword,
  tags: ['autodocs'],
  argTypes: {},
  decorators: [withRouter],
  parameters: {
    reactRouter: reactRouterParameters({
      routing: { path: '/' },
    }),
  },
} satisfies Meta<typeof ForgotPassword>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
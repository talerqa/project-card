import type {Meta, StoryObj} from '@storybook/react'

import {CheckEmail} from './checkEmail.tsx'
import {
  reactRouterParameters,
  withRouter
} from "storybook-addon-react-router-v6";

const meta = {
  title: 'Auth/CheckEmail',
  component: CheckEmail,
  tags: ['autodocs'],
  argTypes: {},
  decorators: [withRouter],
  parameters: {
    reactRouter: reactRouterParameters({
      routing: { path: '/' },
    }),
  },
} satisfies Meta<typeof CheckEmail>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
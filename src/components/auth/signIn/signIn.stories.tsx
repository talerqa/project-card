import type {Meta, StoryObj} from '@storybook/react'

import {SignIn} from './signIn.tsx'
import {
  reactRouterParameters,
  withRouter
} from "storybook-addon-react-router-v6";

const meta = {
  title: 'Auth/SignIn',
  component: SignIn,
  tags: ['autodocs'],
  argTypes: {},
  decorators: [withRouter],
  parameters: {
    reactRouter: reactRouterParameters({
      routing: { path: '/' },
    }),
  },
} satisfies Meta<typeof SignIn>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
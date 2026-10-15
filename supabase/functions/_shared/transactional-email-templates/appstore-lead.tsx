import * as React from 'npm:react@18.3.1'
import { Body, Container, Head, Heading, Html, Preview, Text } from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  subject?: string
  text?: string
}

const Email = ({ subject, text }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>{subject || 'New App Store lead'}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>{subject || 'New App Store lead'}</Heading>
        <Text style={body}>{text || '(No details)'}</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: (data: Record<string, any>) => data.subject || 'New App Store lead',
  displayName: 'App Store lead notification',
  to: 'huruydesigns@gmail.com',
  previewData: {
    subject: 'App Store launch: Jane Doe',
    text: 'Name: Jane Doe\nEmail: jane@example.com\nApp: https://apps.apple.com/app/example\nWhere it stands: not-submitted\nApple Developer account: Yes\n\nDetails here.',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '20px 25px' }
const heading = { fontSize: '20px', color: '#111111' }
const body = { fontSize: '14px', color: '#333333', whiteSpace: 'pre-wrap' as const }

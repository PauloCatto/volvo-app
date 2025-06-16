export enum DialogType {
  Terms = 'terms',
  Privacy = 'privacy',
  Contact = 'contact',
}

export const DialogContent: Record<
  DialogType,
  { title: string; message: string }
> = {
  [DialogType.Terms]: {
    title: 'Terms of Service',
    message: `
      By using this application, you agree to abide by all applicable laws and regulations.
      Unauthorized use or distribution of the content is strictly prohibited.
      Volvo Brazil reserves the right to update these terms at any time without prior notice.
    `,
  },
  [DialogType.Privacy]: {
    title: 'Privacy Policy',
    message: `
      We value your privacy. Your personal data is collected and used solely for enhancing your experience with our services.
      We do not share your information with third parties without your consent.
      For more details, please review our full privacy policy.
    `,
  },
  [DialogType.Contact]: {
    title: 'Contact Us',
    message: `
      Need assistance or have questions?
      Feel free to reach out to our support team at support@volvobrazil.com or call us at +55 11 1234-5678.
      We are available Monday to Friday, from 9 AM to 6 PM (BRT).
    `,
  },
};

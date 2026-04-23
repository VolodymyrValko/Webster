import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private resend: Resend;
  private from: string;

  constructor(private config: ConfigService) {
    const apiKey = config.get<string>('RESEND_API_KEY', '');
    this.resend = new Resend(apiKey);
    this.from = config.get('MAIL_FROM', 'Webster <onboarding@resend.dev>');

    if (!apiKey) {
      this.logger.warn('RESEND_API_KEY is not set — emails will not be sent');
    } else {
      this.logger.log(`Email service ready (Resend) — from: ${this.from}`);
    }
  }

  async sendVerificationEmail(to: string, name: string, token: string): Promise<void> {
    const backendUrl = this.config.get('BACKEND_PUBLIC_URL', 'http://localhost:3001');
    const link = `${backendUrl}/api/auth/verify?token=${token}`;

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: Inter, Arial, sans-serif; background: #f8f7ff; margin: 0; padding: 0; }
    .wrap { max-width: 560px; margin: 40px auto; background: #fff; border-radius: 16px;
            box-shadow: 0 4px 24px rgba(108,99,255,.10); overflow: hidden; }
    .header { background: linear-gradient(135deg,#6c63ff,#a855f7); padding: 40px 32px; text-align: center; }
    .logo { font-size: 28px; font-weight: 700; color: #fff; letter-spacing: -0.5px; }
    .body { padding: 40px 32px; }
    h2 { color: #1a1a2e; margin: 0 0 12px; font-size: 22px; }
    p { color: #6b6b8d; line-height: 1.7; margin: 0 0 20px; }
    .btn { display: inline-block; padding: 14px 32px; background: #6c63ff;
           color: #fff !important; text-decoration: none; border-radius: 10px;
           font-weight: 600; font-size: 15px; }
    .footer { padding: 24px 32px; background: #f8f7ff; text-align: center;
              color: #aaa; font-size: 12px; }
    .link { color: #6c63ff; word-break: break-all; font-size: 13px; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="header">
      <div class="logo">🎨 Webster</div>
    </div>
    <div class="body">
      <h2>Привіт, ${name}!</h2>
      <p>Дякуємо за реєстрацію в Webster. Щоб активувати акаунт і почати створювати дизайни — підтвердіть свою електронну пошту.</p>
      <p style="text-align:center">
        <a href="${link}" class="btn">Підтвердити пошту</a>
      </p>
      <p style="font-size:13px">Якщо кнопка не працює, скопіюйте посилання:</p>
      <p><a href="${link}" class="link">${link}</a></p>
      <p style="font-size:13px;color:#bbb">Посилання дійсне 24 години. Якщо ви не реєструвалися — проігноруйте цей лист.</p>
    </div>
    <div class="footer">© ${new Date().getFullYear()} Webster · Online Graphic Editor</div>
  </div>
</body>
</html>`;

    try {
      const { data, error } = await this.resend.emails.send({
        from: this.from,
        to,
        subject: 'Підтвердіть реєстрацію у Webster',
        html,
      });

      if (error) {
        this.logger.error(`Failed to send email to ${to}: ${error.message}`);
      } else {
        this.logger.log(`Verification email sent to ${to} (id: ${data?.id})`);
      }
    } catch (err) {
      this.logger.error(`Failed to send email to ${to}: ${err.message}`);
    }
  }

  async sendPasswordChangedEmail(to: string, name: string): Promise<void> {
    try {
      await this.resend.emails.send({
        from: this.from,
        to,
        subject: 'Ваш акаунт Webster активовано',
        html: `<p>Привіт, ${name}! Ваш акаунт успішно підтверджено. Ласкаво просимо до Webster 🎨</p>`,
      });
    } catch {
      // silently ignore
    }
  }
}

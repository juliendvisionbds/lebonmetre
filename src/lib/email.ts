import { Resend } from "resend";

const FROM_EMAIL = "Le Bon Métré <noreply@visionbds.com>";
const ADMIN_EMAIL = "juliend@visionbds.com";

let resendClient: Resend | null = null;

/** Instancié à la volée pour ne jamais planter au chargement du module si la clé manque. */
function getResendClient(): Resend {
  if (!resendClient) {
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }
  return resendClient;
}

function layout(kicker: string, bodyHtml: string): string {
  return `<!doctype html>
<html lang="fr">
  <body style="margin:0; padding:0; background:#FCFBF7; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif; color:#14181C;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FCFBF7; padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px; background:#FFFFFF; border:1.5px solid #14181C;">
            <tr>
              <td style="padding:13px 22px; background:#14181C; color:#FCFBF7; font-family:'Courier New',monospace; font-size:11px; letter-spacing:0.12em; text-transform:uppercase;">
                Le&nbsp;Bon&nbsp;Métré · ${kicker}
              </td>
            </tr>
            <tr>
              <td style="padding:28px 26px 30px;">
                ${bodyHtml}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function infoRow(label: string, value: string, last = false): string {
  return `<tr>
    <td style="padding:9px 13px; font-family:'Courier New',monospace; font-size:12px; color:#6E7278; ${last ? "" : "border-bottom:1px solid #EFEFEA;"}">${label}</td>
    <td style="padding:9px 13px; font-family:'Courier New',monospace; font-size:12px; text-align:right; ${last ? "" : "border-bottom:1px solid #EFEFEA;"}">${value}</td>
  </tr>`;
}

export async function sendWaitlistConfirmationEmail(params: {
  email: string;
  rank: number;
}): Promise<void> {
  const { email, rank } = params;

  const html = layout(
    "Inscription alpha",
    `
      <h1 style="font-size:20px; margin:0 0 16px; font-family:Georgia,serif;">Votre place est réservée.</h1>
      <p style="font-size:14.5px; line-height:1.6; color:#6E7278; margin:0 0 18px;">
        Merci pour votre inscription à l'alpha du Bon Métré. Voici le récapitulatif :
      </p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #E3E4DE; margin-bottom:22px;">
        ${infoRow("Email", email)}
        ${infoRow("Position", `<b style="color:#FF5A1F;">#${rank}</b> · vague 01`, true)}
      </table>
      <p style="font-size:14.5px; line-height:1.6; color:#14181C; margin:0 0 18px;">
        On revient vers vous très bientôt pour vous accompagner dans la prise en main du produit
        sur vos premiers plans.
      </p>
      <p style="font-size:13px; line-height:1.6; color:#6E7278; margin:0;">
        Une question d'ici là ? Répondez simplement à cet email, c'est nous qui lisons.
      </p>
    `
  );

  await getResendClient().emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: "Votre place dans l'alpha Le Bon Métré est réservée",
    html,
  });
}

export async function notifyAdminNewSignup(params: {
  email: string;
  rank: number;
  source: string;
}): Promise<void> {
  const { email, rank, source } = params;

  const html = layout(
    "Notification interne",
    `
      <h1 style="font-size:18px; margin:0 0 14px; font-family:Georgia,serif;">Nouvel inscrit à l'alpha.</h1>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #E3E4DE;">
        ${infoRow("Email", email)}
        ${infoRow("Position", `#${rank}`)}
        ${infoRow("Source", source, true)}
      </table>
    `
  );

  await getResendClient().emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `Nouvel inscrit alpha : ${email}`,
    html,
  });
}

export async function notifyAdminProfileCompleted(params: {
  email: string;
  rank: number;
  metier: string;
  volume: string;
  plans: string;
}): Promise<void> {
  const { email, rank, metier, volume, plans } = params;

  const html = layout(
    "Notification interne",
    `
      <h1 style="font-size:18px; margin:0 0 14px; font-family:Georgia,serif;">Profil complété.</h1>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #E3E4DE;">
        ${infoRow("Email", email)}
        ${infoRow("Position", `#${rank}`)}
        ${infoRow("Activité", metier)}
        ${infoRow("Devis / mois", volume)}
        ${infoRow("Format de plans", plans, true)}
      </table>
    `
  );

  await getResendClient().emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `Profil complété : ${email}`,
    html,
  });
}

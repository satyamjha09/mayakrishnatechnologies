import nodemailer from "nodemailer";

export const runtime = "nodejs";

type ContactFormData = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  company?: string;
  businessSize?: string;
  message?: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  try {
    const data = (await request.json()) as ContactFormData;

    const firstName = data.firstName?.trim();
    const lastName = data.lastName?.trim();
    const email = data.email?.trim();
    const phone = data.phone?.trim();
    const company = data.company?.trim() || "Not provided";
    const businessSize = data.businessSize?.trim() || "Not provided";
    const message = data.message?.trim();

    if (!firstName || !lastName || !email || !phone || !message) {
      return Response.json(
        { success: false, message: "Please fill all required fields." },
        { status: 400 },
      );
    }

    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      throw new Error("Email environment variables are missing.");
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const safeFirstName = escapeHtml(firstName);
    const safeLastName = escapeHtml(lastName);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeCompany = escapeHtml(company);
    const safeBusinessSize = escapeHtml(businessSize);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

    await transporter.sendMail({
      from: `"Mayakrishna Website" <${process.env.GMAIL_USER}>`,
      to: "mayakrishnatechnologies@gmail.com",
      replyTo: email,
      subject: `New website enquiry from ${firstName} ${lastName}`,
      text: `
New contact form enquiry

Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone}
Company: ${company}
Business size: ${businessSize}

Message:
${message}
      `,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:650px;margin:auto;color:#172554">
          <h2 style="color:#2563eb">New Mayakrishna Website Enquiry</h2>

          <table style="width:100%;border-collapse:collapse">
            <tr>
              <td style="padding:10px;border:1px solid #dbeafe"><strong>Name</strong></td>
              <td style="padding:10px;border:1px solid #dbeafe">${safeFirstName} ${safeLastName}</td>
            </tr>

            <tr>
              <td style="padding:10px;border:1px solid #dbeafe"><strong>Email</strong></td>
              <td style="padding:10px;border:1px solid #dbeafe">${safeEmail}</td>
            </tr>

            <tr>
              <td style="padding:10px;border:1px solid #dbeafe"><strong>Phone</strong></td>
              <td style="padding:10px;border:1px solid #dbeafe">${safePhone}</td>
            </tr>

            <tr>
              <td style="padding:10px;border:1px solid #dbeafe"><strong>Company</strong></td>
              <td style="padding:10px;border:1px solid #dbeafe">${safeCompany}</td>
            </tr>

            <tr>
              <td style="padding:10px;border:1px solid #dbeafe"><strong>Business size</strong></td>
              <td style="padding:10px;border:1px solid #dbeafe">${safeBusinessSize}</td>
            </tr>
          </table>

          <div style="margin-top:20px;padding:16px;background:#eff6ff;border-radius:10px">
            <strong>Message</strong>
            <p style="line-height:1.6">${safeMessage}</p>
          </div>
        </div>
      `,
    });

    return Response.json({
      success: true,
      message: "Your message was sent successfully.",
    });
  } catch (error) {
    console.error("Contact email error:", error);

    return Response.json(
      {
        success: false,
        message: "Unable to send your message. Please try again.",
      },
      { status: 500 },
    );
  }
}

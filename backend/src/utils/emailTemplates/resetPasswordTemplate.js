export function generateResetEmailHTML(username, resetCode) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #333; border-radius: 8px; background-color: #000; color: #d1ffd6;">
      <h2 style="color: #00ff88; text-align: center; margin-bottom: 24px;">Brook<span style="color: white; ">Flow</span></h2>
      
      <p style="font-size: 16px; margin-bottom: 16px; text-align: center; color: #00ff88">
        Hi <strong>${username || "there"}</strong>,
      </p>

      <p style="font-size: 15px; margin-bottom: 24px; text-align: center; color: #00ff88">
        You recently requested to reset your password. Use the code below to proceed. 
        This code is valid for <strong>15 minutes</strong>.
      </p>

      <div style="text-align: center; margin: 30px 0; ">
        <span style="display: inline-block; font-size: 28px; letter-spacing: 4px; font-weight: bold; background-color: #00ff88; color: #000; padding: 12px 24px; border-radius: 8px;">
          ${resetCode}
        </span>
      </div>

      <p style="font-size: 14px; color: #aaa; text-align: center;">
        If you didn’t request this, you can safely ignore this email.
      </p>

      <p style="font-size: 14px; color: #aaa; text-align: center;">
        — The BrookFlow Team
      </p>
    </div>
  `;
}

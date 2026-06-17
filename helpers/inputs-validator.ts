export function validateEmail(email: any) {
  if (!email) {
    throw new Error("Email tidak boleh kosong.");
  }

  if (typeof email !== "string") {
    throw new Error("Format alamat email tidak valid.");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    throw new Error("Format alamat email tidak valid.");
  }

  return email.trim();
}

export function validatePassword(password: any) {
  if (!password) {
    throw new Error("Kata sandi tidak boleh kosong.");
  }

  if (typeof password !== "string") {
    throw new Error(
      "Format kata sandi tidak valid.",
    );
  }

  if (password.length < 8) {
    throw new Error("Kata sandi terlalu lemah. Gunakan minimal 8 karakter.");
  }

  return password;
}

export function validatePhone(phone: any) {
  if (!phone) {
    throw new Error("Nomor telepon tidak boleh kosong.")
  }

  if (typeof phone !== "string") {
    throw new Error("Format nomor telepon tidak valid.");
  }

  const cleanPhone = phone.trim().replace(/\s+/g, "");
  const phoneRegex = /^\+[1-9]\d{1,14}$/;

  if (!phoneRegex.test(cleanPhone)) {
    throw new Error(
      "Gagal mengirim SMS. Gunakan format internasional (contoh: +62812345xxx).",
    );
  }

  return cleanPhone;
}

export function validateOTP(token: any, length = 6) {
  if (!token || typeof token !== "string") {
    throw new Error("Verifikasi gagal. Kode salah atau tidak valid.");
  }

  const cleanToken = token.trim();
  const otpRegex = new RegExp(`^\\d{${length}}$`);

  if (!otpRegex.test(cleanToken)) {
    throw new Error(
      `Kode OTP harus berupa angka dan berjumlah ${length} digit.`,
    );
  }

  return cleanToken;
}

export function validateCredentials(email: any, password: any) {
  validateEmail(email);
  validatePassword(password);
}

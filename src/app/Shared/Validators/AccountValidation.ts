const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{2,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&^_\-])[A-Za-z\d@$!%*#?&^_\-]{6,}$/;
const nicknameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9_-]{4,20}$/;

export class AccountValidation {
  static validateName(name?: string): string | null {
    if (!name?.trim()) return 'Nome é obrigatório';
    if (!nameRegex.test(name)) return 'Nome inválido';
    return null;
  }

  static validateLastName(lastName?: string): string | null {
    if (!lastName?.trim()) return 'Sobrenome é obrigatório';
    if (!nameRegex.test(lastName)) return 'Sobrenome inválido';
    return null;
  }
  static validateEmail(email?: string): string | null {
    if (!email?.trim()) return 'Email é obrigatório';
    if (!emailRegex.test(email)) return 'Email inválido';
    return null;
  }
  static validatePassword(password?: string): string | null {
    if (!password) return 'Senha é obrigatória';
    if (!passwordRegex.test(password)) {
      return 'Precisa ter pelo menos 6 caracteres e conter pelo menos um número, uma letra maiúscula, uma letra minúscula e um caractere especial';
    }
    return null;
  }
  static validateConfirmPassword(
    password?: string,
    confirmPassword?: string
  ): string | null {
    if (!confirmPassword) return 'Confirmação de senha é obrigatória';
    if (password !== confirmPassword) return 'As senhas não coincidem';
    return null;
  }
  static validateNickname(name?: string): string | null {
    if (!name?.trim()) return 'Nickname é obrigatório';
    if (!nicknameRegex.test(name)) return 'Nickname inválido';
    return null;
  }

  // se tiver todos os campos usa esse meu rei
  static validateAll(fields: {
    name?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    nickname?: string;
  }): Partial<
    Record<
      | 'name'
      | 'lastName'
      | 'email'
      | 'password'
      | 'confirmPassword'
      | 'nickname',
      string
    >
  > {
    const errors: Partial<
      Record<
        | 'name'
        | 'lastName'
        | 'email'
        | 'password'
        | 'confirmPassword'
        | 'nickname',
        string
      >
    > = {};

    const nameError = this.validateName(fields.name);
    if (nameError) errors.name = nameError;

    const lastNameError = this.validateLastName(fields.lastName);
    if (lastNameError) errors.lastName = lastNameError;

    const emailError = this.validateEmail(fields.email);
    if (emailError) errors.email = emailError;

    const passwordError = this.validatePassword(fields.password);
    if (passwordError) errors.password = passwordError;

    const confirmPasswordError = this.validateConfirmPassword(
      fields.password,
      fields.confirmPassword
    );
    if (confirmPasswordError) errors.confirmPassword = confirmPasswordError;

    const nicknameError = this.validateNickname(fields.nickname);
    if (nicknameError) errors.nickname = nicknameError;

    return errors;
  }
}

import bcrypt from 'bcryptjs';
import { User } from '../../../src/models/User';

describe('User model', () => {
  const email = 'hash@test.com';
  const plainPassword = 'Secret123';

  it('hashes password on save', async () => {
    const user = await User.create({ email, password: plainPassword });

    expect(user.password).not.toBe(plainPassword);

    const match = await bcrypt.compare(plainPassword, user.password);
    expect(match).toBe(true);
  });

  it('comparePassword returns correct boolean', async () => {
    const user = await User.create({ email, password: plainPassword });

    expect(await user.comparePassword(plainPassword)).toBe(true);
    expect(await user.comparePassword('WrongPass1')).toBe(false);
  });

  it('does not re-hash if password unmodified', async () => {
    const user = await User.create({ email, password: plainPassword });
    const originalHash = user.password;

    user.email = 'new@test.com';
    await user.save();

    expect(user.password).toBe(originalHash);
  });

  it('enforces unique email constraint', async () => {
    await User.create({ email, password: plainPassword });

    await expect(User.create({ email, password: 'AnotherPass1' })).rejects.toThrow(/duplicate key/);
  });
});

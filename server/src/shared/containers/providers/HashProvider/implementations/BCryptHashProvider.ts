import { compare, hash } from 'bcrypt'
import { IHashProvider } from '../models/IHashProvider'

const HASH_SALT = 8

export class BCryptHashProvider implements IHashProvider {
    public async generateHash(payload: string): Promise<string> {
        return await hash(payload, HASH_SALT)
    }

    public async compareHash(payload: string, hashed: string): Promise<boolean> {
        return await compare(payload, hashed)
    }
}

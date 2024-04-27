import { PrimaryGeneratedColumn } from 'typeorm';

export abstract class AbstractEntity {
  @PrimaryGeneratedColumn()
  public readonly id: number;
}

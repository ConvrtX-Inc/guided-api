import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { execSync } from 'child_process';
import { Guideline } from 'src/guidelines/entities/guideline.entity';
import { Transaction } from 'src/transaction/transaction.entity';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DashboardRelatedService {
  constructor(
    @InjectRepository(User)
    private repoUser: Repository<User>,

    @InjectRepository(Guideline)
    private repoGuide: Repository<Guideline>,

    @InjectRepository(Transaction)
    private repoTransaction: Repository<Transaction>,
  ) {}

  countAllUsers() {
    return this.repoUser.createQueryBuilder().select('Count(id)').getRawOne();
  }

  countActiveUsers() {
    return this.repoTransaction
      .createQueryBuilder()
      .select('Count(id)')
      .where('EXTRACT(YEAR FROM created_date)=EXTRACT(YEAR FROM NOW())')
      .andWhere('extract(month from created_Date)=extract(month from now())')
      .getRawOne();
  }

  countOnlineUsers() {
    return this.repoUser
      .createQueryBuilder()
      .select('Count(id)')
      .where('is_online = true')
      .getRawOne();
  }

  async countTotalDownloads() {
    const { exec } = require('child_process');

    try {
      const cmd = 'node googledata.js';
      execSync(cmd).toString();

      const fs = require('fs');

      let rawdata = fs.readFileSync('gdata.json');
      let student = JSON.parse(rawdata);

      return { downloads: student['maxInstalls'] };
    } catch {}
  }

  recentPosts() {
    return this.repoGuide
      .createQueryBuilder()
      .orderBy('created_date', 'DESC')
      .limit(10)
      .getRawMany();
  }

  recentGuides() {
    return this.repoUser
      .createQueryBuilder()
      .where('is_guide = true')
      .orderBy('created_date', 'DESC')
      .limit(10)
      .getRawMany();
  }

  mostActiveUsers() {
    const usersfromTransaction = this.repoTransaction
      //createQueryBuilder("transaction")
      .createQueryBuilder()
      .select('user_id,first_name,last_name,email')
      .distinctOn(['"Transaction".user_id'])
      //.leftJoinAndSelect(User, 'user', 'user.id = "Transaction".user_id')
      .leftJoin(User, 'user', 'user.id = "Transaction".user_id')
      .where(
        'EXTRACT(YEAR FROM "Transaction".created_date)=EXTRACT(YEAR FROM NOW())',
      )
      .andWhere(
        'extract(month from "Transaction".created_Date)=extract(month from now())',
      )
      .limit(10)
      .getRawMany();

    return usersfromTransaction;
  }
}

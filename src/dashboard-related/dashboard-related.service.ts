import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { execSync } from 'child_process';
import { ActivityPost } from 'src/activity-post/activity-post.entity';
import { Guideline } from 'src/guidelines/entities/guideline.entity';
import { Transaction } from 'src/transaction/transaction.entity';
import { User } from 'src/users/user.entity';
import { UserActivityPostSummary } from 'src/user-activity-post-summary/user-activity-post-summary.entity';
import { ActivityPackage } from 'src/activity-package/activity-package.entity';
import { ActivityNewsfeed } from 'src/activity-newsfeed/activity-newsfeed.entity';
import { ActivityEvent } from 'src/activity-event/activity-event.entity';
import { ActivityArticle } from 'src/activity-article/activity-article.entity';
import { ActivityAdvertisement } from 'src/activity-advertisement/entities/activity-advertisement.entity';
import { ActivityOutfitter } from 'src/activity-outfitter/entities/activityOutfitter.entity';
import { CategoryPost } from 'src/activity-post/category-post';
import { Repository } from 'typeorm';

@Injectable()
export class DashboardRelatedService {
  constructor(
    @InjectRepository(User)
    private repoUser: Repository<User>,

    @InjectRepository(Guideline)
    private repoGuide: Repository<Guideline>,

    @InjectRepository(ActivityPost)
    private repoActivityPost: Repository<ActivityPost>,

    @InjectRepository(Transaction)
    private repoTransaction: Repository<Transaction>,

    @InjectRepository(UserActivityPostSummary)
    private repoUserActivityPostSummary: Repository<UserActivityPostSummary>,

    @InjectRepository(ActivityPackage)
    private repoActivityPackage: Repository<ActivityPackage>,

    @InjectRepository(ActivityNewsfeed)
    private repoActivityNewsfeed: Repository<ActivityNewsfeed>,

    @InjectRepository(ActivityEvent)
    private repoActivityEvent: Repository<ActivityEvent>,

    @InjectRepository(ActivityArticle)
    private repoActivityArticle: Repository<ActivityArticle>,
        
    @InjectRepository(ActivityAdvertisement)
    private repoActivityAdvertisement: Repository<ActivityAdvertisement>,

    @InjectRepository(ActivityOutfitter)
    private repoActivityOutfitter: Repository<ActivityOutfitter>,    
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

      return { downloads: student['installs'] };
    } catch {}
  }

  recentPosts() {
    return this.repoActivityPost
      .createQueryBuilder()
      .orderBy('created_date', 'DESC')
      .limit(10)
      .getRawMany();
  }

  
  recentPostsByUserID(user_id: string) {
    return this.repoActivityPost
      .createQueryBuilder()
      .where('user_id = :user_id', {user_id: user_id})
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

  getUserActivityPostSummary(user_id: string) {    
    return this.repoUserActivityPostSummary
      .createQueryBuilder()
      .where('user_id = :user_id', {user_id: user_id})            
      .getRawMany();
  }

  async getUserRecentPost(user_id: string)
  {
    let data = [];
    data = await this.repoActivityPost
      .createQueryBuilder()
      .where('user_id = :user_id', {user_id})
      .orderBy('created_date', 'DESC')
      .limit(10)
      .getRawMany();
    
    for (const post of data) {
        switch (post.category_type) {
          case CategoryPost.cpActivityPackage: {
            const query = this.repoActivityPackage.createQueryBuilder('package')
                          .select('package.id, package.name, dimage.snapshot_img')
                          .innerJoin(
                            'activity_package_destination',
                            'destination',
                            "destination.activity_package_id::text = package.id::text")
                          .innerJoin(
                            'activity_package_destination_image',
                            'dimage',
                            "dimage.activity_package_destination_id::text = destination.id::text")
                          .where("package.id = '" +  post.id + "'");
            const res  = query.getRawOne(); 
            data['activity_package_destination'] = res;
          }           
          case CategoryPost.cpNewsFeed: {
            const query = this.repoActivityNewsfeed.createQueryBuilder('newsfeed')
                          .select('newsfeed.id, newsfeed.title, dimage.snapshot_img')                          
                          .innerJoin(
                            'activity_newsfeed_image',
                            'dimage',
                            "dimage.activity_newsfeed_id::text = newsfeed.id::text")
                          .where("newsfeed.id = '" +  post.id + "'");
            const res  = query.getRawOne(); 
            data['activity_newsfeed'] = res;
          }       
          case CategoryPost.cpEvent: {
            const query = this.repoActivityEvent.createQueryBuilder('event')
                          .select('event.id, event.title, dimage.snapshot_img')                          
                          .innerJoin(
                            'activity_event_image',
                            'dimage',
                            "dimage.activity_event_id::text = event.id::text")
                          .where("event.id = '" +  post.id + "'");
            const res  = query.getRawOne(); 
            data['activity_event'] = res;
          }       
          case CategoryPost.cpArticle: {
            const query = this.repoActivityArticle.createQueryBuilder('article')
                          .select('article.id, article.title, dimage.snapshot_img')                          
                          .innerJoin(
                            'activity_article_image',
                            'dimage',
                            "dimage.activity_article_id::text = article.id::text")
                          .where("article.id = '" +  post.id + "'");
            const res  =  query.getRawOne(); 
            data['activity_article'] = res;
          }   
          case CategoryPost.cpAdvertisement: {
            const query = this.repoActivityAdvertisement.createQueryBuilder('advertisement')
                          .select('advertisement.id, advertisement.title, dimage.snapshot_img')                          
                          .innerJoin(
                            'activity_advertisement_image',
                            'dimage',
                            "dimage.activity_advertisement_id::text = advertisement.id::text")
                          .where("advertisement.id = '" +  post.id + "'");
            const res  = query.getRawOne(); 
            data['activity_advertisement'] = res;
          }   
          case CategoryPost.cpOutfitter: {
            const query = this.repoActivityOutfitter.createQueryBuilder('outfitter')
                          .select('outfitter.id, outfitter.title, dimage.snapshot_img')                          
                          .innerJoin(
                            'activity_outfitter_image',
                            'dimage',
                            "dimage.activity_outfitter_id::text = outfitter.id::text")
                          .where("outfitter.id = '" +  post.id + "'");
            const res  = query.getRawOne(); 
            data['activity_outfitter'] = res;
          }   
        } //switch      
    }
    
    return {
      status: HttpStatus.OK,
      response: {
        data: data        
      },
    };
    
  } 

}

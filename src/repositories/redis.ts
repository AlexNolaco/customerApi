const redis = require('ioredis');
const config = require('../config/app.config');
import { Injectable } from '@nestjs/common';

@Injectable()
class RedisBaseRepository {
    redisClient: any;

    constructor() {
        this.redisClient = redis.createClient({ url: config.redisUrl });
    }

    async get(key) {
        try {
            const results = await this.redisClient.get(key);
            return JSON.parse(results);
        } 
        catch (err) {
            return err;
        }
    }

    async del(key) {
        try {
            return this.redisClient.del(key);
        } catch (err) {
            return err;
        }
    }

    async set(key, value) {
        try {
            return this.redisClient.set(key, JSON.stringify(value));
        }
        catch (err) {
            return err;
        }
    }

    async keys(key) {
        try {
            return this.redisClient.keys(key);
        } 
        catch (err) {
            return err;
        }
    }   
}
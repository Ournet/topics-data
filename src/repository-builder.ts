import { MongoTopicRepository } from "./mongo-topic-repository";
import { TopicRepository } from "@ournet/topics-domain";
import { Db } from "mongodb";
import { TopicModel } from "./topic-model";



export class RepositoryBuilder {
    static buildTopicRepository(db: Db, tableSuffix: string = 'v0'): TopicRepository {
        return new MongoTopicRepository(new TopicModel(db, tableSuffix));
    }
}

import { MongoModel } from "./mongo-model";
import { Topic, TopicHelper, TopicRepository, TopicWikiId } from '@ournet/topics-domain';
import { RepositoryUpdateData, RepositoryAccessOptions } from "@ournet/domain";
import { FindOneOptions, Db } from "mongodb";

const WIKI_ID_KEY = 'wikiIdKey';

export class TopicModel extends MongoModel<Topic> implements TopicRepository {
    constructor(db: Db, tableSuffix: string) {
        super(db, `ournet_topics_${tableSuffix}`);
    }

    async getByWikiIds(wikiIds: TopicWikiId[], options?: RepositoryAccessOptions<Topic>): Promise<Topic[]> {
        if (wikiIds.length === 0) {
            return []
        }
        const mongoOptions: FindOneOptions = { limit: wikiIds.length };
        if (options && options.fields && options.fields.length) {
            mongoOptions.projection = this.fillObjectFields(options.fields as string[], 1, true);
        }
        const result = await this.collection.find({
            wikiIdKey: { $in: wikiIds.map(item => formatWikiIdKey(item, item.wikiId)) }
        }, mongoOptions).toArray();

        return result.map(item => this.convertFromMongoDoc(item));
    }

    async createStorage() {
        await super.createStorage();
        await super.collection.createIndex({ wikiIdKey: 1 }, { unique: true });
    }

    protected beforeCreate(data: Topic) {
        if (data.wikiId) {
            (<any>data)[WIKI_ID_KEY] = formatWikiIdKey(data, data.wikiId);
        }

        return super.beforeCreate(data);
    }

    protected beforeUpdate(data: RepositoryUpdateData<Topic>) {
        if (data.set && data.set.wikiId) {
            (<any>data.set)[WIKI_ID_KEY] = formatWikiIdKey(TopicHelper.parseLocaleFromId(data.id), data.set.wikiId);
        }
        if (data.delete && data.delete.includes('wikiId')) {
            (data.delete as string[]).push(WIKI_ID_KEY);
        }

        return super.beforeUpdate(data);
    }

    protected convertFromMongoDoc(doc: any): Topic {
        delete doc[WIKI_ID_KEY];

        return super.convertFromMongoDoc(doc);
    }
}

function formatWikiIdKey(locale: { lang: string, country: string }, wikiId: string) {
    return `${locale.lang.toLowerCase()}${locale.country.toLowerCase()}_${wikiId.toLowerCase()}`;
}

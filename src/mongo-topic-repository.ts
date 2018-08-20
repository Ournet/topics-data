import { BaseRepository, RepositoryAccessOptions, RepositoryUpdateData } from "@ournet/domain";
import { TopicRepository, Topic, TopicWikiId, TopicValidator } from "@ournet/topics-domain";
import { TopicModel } from "./topic-model";

export class MongoTopicRepository extends BaseRepository<Topic> implements TopicRepository {
    constructor(private model: TopicModel) {
        super(new TopicValidator());
    }

    innerCreate(data: Topic): Promise<Topic> {
        return this.model.create(data);
    }
    innerUpdate(data: RepositoryUpdateData<Topic>): Promise<Topic> {
        return this.model.update(data);
    }
    delete(id: string): Promise<boolean> {
        return this.model.delete(id);
    }
    getById(id: string, options?: RepositoryAccessOptions<Topic>): Promise<Topic | null> {
        return this.model.getById(id, options);
    }
    getByIds(ids: string[], options?: RepositoryAccessOptions<Topic>): Promise<Topic[]> {
        return this.model.getByIds(ids, options);
    }
    exists(id: string): Promise<boolean> {
        return this.model.exists(id);
    }
    deleteStorage(): Promise<void> {
        return this.model.deleteStorage();
    }
    createStorage(): Promise<void> {
        return this.model.createStorage();
    }
    getByWikiIds(wikiIds: TopicWikiId[], options?: RepositoryAccessOptions<Topic>): Promise<Topic[]> {
        return this.model.getByWikiIds(wikiIds, options);
    }
}

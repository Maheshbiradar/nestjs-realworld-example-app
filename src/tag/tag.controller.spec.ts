import { Test } from "@nestjs/testing";
import { TagController } from "./tag.controller";
import { TagService } from "./tag.service";
import { TagEntity } from "./tag.entity";

describe("TagController", () => {
  let tagController: TagController;
  let tagService: { findAll: jest.Mock };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [TagController],
      providers: [
        {
          provide: TagService,
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    tagService = module.get(TagService);
    tagController = module.get<TagController>(TagController);
  });

  describe("findAll", () => {
    it("should return an array of tags", async () => {
      const tags: TagEntity[] = [];
      const createTag = (id: number, name: string): TagEntity => {
        const tag = new TagEntity();
        tag.id = id;
        tag.tag = name;
        return tag;
      };
      tags.push(createTag(1, "angularjs"));
      tags.push(createTag(2, "reactjs"));

      tagService.findAll.mockResolvedValue(tags);

      const findAllResult = await tagController.findAll();
      expect(findAllResult).toBe(tags);
    });
  });
});

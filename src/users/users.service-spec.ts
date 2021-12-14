import { Test, TestingModule } from "@nestjs/testing"
import { getRepositoryToken, TypeOrmModule } from "@nestjs/typeorm"
import { User } from "./user.entity"
import { UsersService } from "./users.service"
import { Repository, UpdateResult } from "typeorm"
import { UsersCrudService } from "./users-crud.service"
import { FindOptions } from "../utils/types/find-options.type"
import { HttpException } from "@nestjs/common"
import { MockType } from "../utilities/test.mock-type"
import { FileEntity } from "../files/file.entity"

//mock factories
const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
    update: jest.fn((id: string, user: User) => { return new UpdateResult() }),
    findOne: jest.fn((id: string) => { return null }),
    // ...
}))

const userCrudServiceMockFactory: () => MockType<UsersCrudService> = jest.fn(() => ({
    findOneEntity: jest.fn((options: FindOptions<User>) => { return new User() })
    // ...
}))

describe('Users Service (Unit Test)', () => {
    let service: UsersService
    let crudService: UsersCrudService
    let userRepo: Repository<User>
    let fileRepo: Repository<FileEntity>

    let testUser: User

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                UsersCrudService,
                { provide: getRepositoryToken(User), useFactory: repositoryMockFactory },
                { provide: getRepositoryToken(FileEntity), useFactory: repositoryMockFactory }
            ]
        })
            .overrideProvider(UsersCrudService).useFactory({ factory: userCrudServiceMockFactory })
            .compile()

        service = module.get(UsersService)
        crudService = module.get(UsersCrudService)
        userRepo = module.get(getRepositoryToken(User))
        fileRepo = module.get(getRepositoryToken(FileEntity))

        //define test entity
        testUser = new User()
        testUser.id = '123'
        testUser.last_name = 'last name'
        testUser.first_name = 'first name'
        testUser.email = 'first.last@email.com'
        testUser.phone_no = 639161112232

        expect(service).toBeDefined()
        expect(crudService).toBeDefined()
        expect(userRepo).toBeDefined()
        expect(fileRepo).toBeDefined()
    })

    describe('Update Phone No', () => {

        it('should successfully update', async () => {

            let findOneEntitySpy = jest.spyOn(crudService, 'findOneEntity').mockImplementation(async (options: FindOptions<User>) => { return testUser })
            let updateSpy = jest.spyOn(userRepo, 'update').mockImplementation(async (id: string, user: User) => { return new UpdateResult() })

            await service.updatePhoneNo('123', 639173332626)

            expect(findOneEntitySpy).toHaveBeenCalled()
            expect(updateSpy).toHaveBeenCalled()
        })

        it('should fail if user id not specified', async () => {

            let findOneEntitySpy = jest.spyOn(crudService, 'findOneEntity').mockImplementation(async (options: FindOptions<User>) => { return testUser })
            let updateSpy = jest.spyOn(userRepo, 'update').mockImplementation(async (id: string, user: User) => { return new UpdateResult() })

            await expect(service.updatePhoneNo(null, 639173332626))
                .rejects
                .toThrow(HttpException)

            expect(findOneEntitySpy).toHaveBeenCalledTimes(0)
            expect(updateSpy).toHaveBeenCalledTimes(0)
        })

        it('should fail if phone_no not specified', async () => {

            let findOneEntitySpy = jest.spyOn(crudService, 'findOneEntity').mockImplementation(async (options: FindOptions<User>) => { return testUser })
            let updateSpy = jest.spyOn(userRepo, 'update').mockImplementation(async (id: string, user: User) => { return new UpdateResult() })

            await expect(service.updatePhoneNo("123", 0))
                .rejects
                .toThrow(HttpException)

            expect(findOneEntitySpy).toHaveBeenCalledTimes(0)
            expect(updateSpy).toHaveBeenCalledTimes(0)
        })

        it('should fail if User not Found', async () => {

            let findOneEntitySpy = jest.spyOn(crudService, 'findOneEntity').mockImplementation(async (options: FindOptions<User>) => { return null })
            let updateSpy = jest.spyOn(userRepo, 'update').mockImplementation(async (id: string, user: User) => { return new UpdateResult() })

            await expect(service.updatePhoneNo('123', 639173332626))
                .rejects
                .toThrow(HttpException)

            expect(findOneEntitySpy).toHaveBeenCalled()
            expect(updateSpy).toHaveBeenCalledTimes(0)
        })
    })

    describe('Update User', () => {
        it('should successfully update', async () => {

            let findOneEntitySpy = jest.spyOn(crudService, 'findOneEntity').mockImplementation(async (options: FindOptions<User>) => { return testUser })
            let updateSpy = jest.spyOn(userRepo, 'update').mockImplementation(async (id: string, user: User) => { return new UpdateResult() })

            testUser.password = '123456'
            await service.update('123', testUser)

            expect(findOneEntitySpy).toHaveBeenCalled()
            expect(updateSpy).toHaveBeenCalled()
        })

        it('should fail if password is not provided', async () => {

            let findOneEntitySpy = jest.spyOn(crudService, 'findOneEntity').mockImplementation(async (options: FindOptions<User>) => { return testUser })
            let updateSpy = jest.spyOn(userRepo, 'update').mockImplementation(async (id: string, user: User) => { return new UpdateResult() })

            await expect(service.update('123', testUser))
                .rejects
                .toThrow(HttpException)

            expect(findOneEntitySpy).toHaveBeenCalledTimes(0)
            expect(updateSpy).toHaveBeenCalledTimes(0)
        })

        it('should fail if password is not long enough (should be 6 chars)', async () => {

            let findOneEntitySpy = jest.spyOn(crudService, 'findOneEntity').mockImplementation(async (options: FindOptions<User>) => { return testUser })
            let updateSpy = jest.spyOn(userRepo, 'update').mockImplementation(async (id: string, user: User) => { return new UpdateResult() })

            testUser.password = '12345'
            await expect(service.update('123', testUser))
                .rejects
                .toThrow(HttpException)

            expect(findOneEntitySpy).toHaveBeenCalledTimes(0)
            expect(updateSpy).toHaveBeenCalledTimes(0)
        })

        it('should fail if id is not specified', async () => {

            let findOneEntitySpy = jest.spyOn(crudService, 'findOneEntity').mockImplementation(async (options: FindOptions<User>) => { return testUser })
            let updateSpy = jest.spyOn(userRepo, 'update').mockImplementation(async (id: string, user: User) => { return new UpdateResult() })

            testUser.id = null
            await expect(service.update('123', testUser))
                .rejects
                .toThrow(HttpException)

            expect(findOneEntitySpy).toHaveBeenCalledTimes(0)
            expect(updateSpy).toHaveBeenCalledTimes(0)
        })

        it('should fail if user does not exist', async () => {

            let findOneEntitySpy = jest.spyOn(crudService, 'findOneEntity').mockImplementation(async (options: FindOptions<User>) => { return null })
            let updateSpy = jest.spyOn(userRepo, 'update').mockImplementation(async (id: string, user: User) => { return new UpdateResult() })

            testUser.password = '123456'
            await expect(service.update('123', testUser))
                .rejects
                .toThrow(HttpException)

            expect(findOneEntitySpy).toHaveBeenCalled()
            expect(updateSpy).toHaveBeenCalledTimes(0)
        })
    })

    describe('Update About Text', () => {

        it('should successfully update', async () => {

            let findOneEntitySpy = jest.spyOn(crudService, 'findOneEntity').mockImplementation(async (options: FindOptions<User>) => { return testUser })
            let updateSpy = jest.spyOn(userRepo, 'update').mockImplementation(async (id: string, user: User) => { return new UpdateResult() })

            await service.updateAbout('123', 'a valid about text')

            expect(findOneEntitySpy).toHaveBeenCalled()
            expect(updateSpy).toHaveBeenCalled()
        })

        it('should fail if user id not specified', async () => {

            let findOneEntitySpy = jest.spyOn(crudService, 'findOneEntity').mockImplementation(async (options: FindOptions<User>) => { return testUser })
            let updateSpy = jest.spyOn(userRepo, 'update').mockImplementation(async (id: string, user: User) => { return new UpdateResult() })

            await expect(service.updateAbout(null, 'a valid about text'))
                .rejects
                .toThrow(HttpException)

            expect(findOneEntitySpy).toHaveBeenCalledTimes(0)
            expect(updateSpy).toHaveBeenCalledTimes(0)
        })

        it('should fail if User not Found', async () => {

            let findOneEntitySpy = jest.spyOn(crudService, 'findOneEntity').mockImplementation(async (options: FindOptions<User>) => { return null })
            let updateSpy = jest.spyOn(userRepo, 'update').mockImplementation(async (id: string, user: User) => { return new UpdateResult() })

            await expect(service.updateAbout('123', 'a valid about text'))
                .rejects
                .toThrow(HttpException)

            expect(findOneEntitySpy).toHaveBeenCalled()
            expect(updateSpy).toHaveBeenCalledTimes(0)
        })
    })

    describe('Update Photo', () => {

        it('should successfully update photo', async () => {
            let findOneEntitySpy = jest.spyOn(crudService, 'findOneEntity').mockImplementation(async (options: FindOptions<User>) => { return testUser })
            let findFileSpy = jest.spyOn(fileRepo, 'findOne').mockImplementation(async ({id: string}) => { return new FileEntity() })
            let updateSpy = jest.spyOn(userRepo, 'update').mockImplementation(async (id: string, user: User) => { return new UpdateResult() })
            
            await service.updatePhoto('123', '456')

            expect(findFileSpy).toHaveBeenCalled()
            expect(findOneEntitySpy).toHaveBeenCalled()
            expect(updateSpy).toHaveBeenCalled()
        })

        it('should fail if user id not specified', async () => {

            let findOneEntitySpy = jest.spyOn(crudService, 'findOneEntity').mockImplementation(async (options: FindOptions<User>) => { return testUser })
            let findFileSpy = jest.spyOn(fileRepo, 'findOne').mockImplementation(async ({id: string}) => { return new FileEntity() })
            let updateSpy = jest.spyOn(userRepo, 'update').mockImplementation(async (id: string, user: User) => { return new UpdateResult() })

            await expect(service.updatePhoto(null, '456'))
                .rejects
                .toThrow(HttpException)

            expect(findOneEntitySpy).toHaveBeenCalledTimes(0)
            expect(findFileSpy).toHaveBeenCalledTimes(0)
            expect(updateSpy).toHaveBeenCalledTimes(0)
        })

        it('should fail if file id not specified', async () => {

            let findOneEntitySpy = jest.spyOn(crudService, 'findOneEntity').mockImplementation(async (options: FindOptions<User>) => { return testUser })
            let findFileSpy = jest.spyOn(fileRepo, 'findOne').mockImplementation(async ({id: string}) => { return new FileEntity() })
            let updateSpy = jest.spyOn(userRepo, 'update').mockImplementation(async (id: string, user: User) => { return new UpdateResult() })

            await expect(service.updatePhoto('123', null))
                .rejects
                .toThrow(HttpException)

            expect(findOneEntitySpy).toHaveBeenCalledTimes(0)
            expect(findFileSpy).toHaveBeenCalledTimes(0)
            expect(updateSpy).toHaveBeenCalledTimes(0)
        })

        it('should fail if User not Found', async () => {
            let findOneEntitySpy = jest.spyOn(crudService, 'findOneEntity').mockImplementation(async (options: FindOptions<User>) => { return null })
            let findFileSpy = jest.spyOn(fileRepo, 'findOne').mockImplementation(async ({id: string}) => { return new FileEntity() })
            let updateSpy = jest.spyOn(userRepo, 'update').mockImplementation(async (id: string, user: User) => { return new UpdateResult() })

            await expect(service.updatePhoto('123', '456'))
                .rejects
                .toThrow(HttpException)

            expect(findOneEntitySpy).toHaveBeenCalled()
            expect(findFileSpy).toHaveBeenCalledTimes(0)
            expect(updateSpy).toHaveBeenCalledTimes(0)
        })

        it('should fail if File not Found', async () => {
            let findOneEntitySpy = jest.spyOn(crudService, 'findOneEntity').mockImplementation(async (options: FindOptions<User>) => { return testUser })
            let findFileSpy = jest.spyOn(fileRepo, 'findOne').mockImplementation(async ({id: string}) => { return null })
            let updateSpy = jest.spyOn(userRepo, 'update').mockImplementation(async (id: string, user: User) => { return new UpdateResult() })

            await expect(service.updatePhoto('123', '456'))
                .rejects
                .toThrow(HttpException)

            expect(findOneEntitySpy).toHaveBeenCalled()
            expect(findFileSpy).toHaveBeenCalled()
            expect(updateSpy).toHaveBeenCalledTimes(0)
        })
    })
})
import { Test, TestingModule } from "@nestjs/testing"
import { getRepositoryToken, TypeOrmModule } from "@nestjs/typeorm"
import { User } from "./user.entity"
import { UsersService } from "./users.service"
import { Repository, UpdateResult } from "typeorm"
import { UsersCrudService } from "./users-crud.service"
import { FindOptions } from "src/utils/types/find-options.type"
import { HttpException } from "@nestjs/common"
import { MockType } from "src/utilities/test.mock-type"

//mock factories
const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
    update: jest.fn((id: string, user: User) => { return new UpdateResult() })
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

    let testUser: User

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                UsersCrudService,
                { provide: getRepositoryToken(User), useFactory: repositoryMockFactory }
            ]
        })
            .overrideProvider(UsersCrudService).useFactory({ factory: userCrudServiceMockFactory })
            .compile()

        service = module.get(UsersService)
        crudService = module.get(UsersCrudService)
        userRepo = module.get(getRepositoryToken(User))

        //define test entity
        testUser = new User()
        testUser.id = '123'
        testUser.last_name = 'last name'
        testUser.first_name = 'first name'
        testUser.email = 'first.last@email.com'
        testUser.phone_no = 639161112232
    })

    describe('Update Phone No', () => {

        it('should successfully update', async () => {

            expect(service).toBeDefined()
            expect(crudService).toBeDefined()
            expect(userRepo).toBeDefined()

            let findOneEntitySpy = jest.spyOn(crudService, 'findOneEntity').mockImplementation(async (options: FindOptions<User>) => { return testUser })
            let updateSpy = jest.spyOn(userRepo, 'update').mockImplementation(async (id: string, user: User) => { return new UpdateResult() })

            await service.updatePhoneNo('123', 639173332626)

            expect(findOneEntitySpy).toHaveBeenCalled()
            expect(updateSpy).toHaveBeenCalled()
        })

        it('should fail if user id not specified', async () => {

            expect(service).toBeDefined()
            expect(crudService).toBeDefined()
            expect(userRepo).toBeDefined()

            let findOneEntitySpy = jest.spyOn(crudService, 'findOneEntity').mockImplementation(async (options: FindOptions<User>) => { return testUser })
            let updateSpy = jest.spyOn(userRepo, 'update').mockImplementation(async (id: string, user: User) => { return new UpdateResult() })

            await expect(service.updatePhoneNo(null, 639173332626))
                .rejects
                .toThrow(HttpException)

            expect(findOneEntitySpy).toHaveBeenCalledTimes(0)
            expect(updateSpy).toHaveBeenCalledTimes(0)
        })

        it('should fail if phone_no not specified', async () => {

            expect(service).toBeDefined()
            expect(crudService).toBeDefined()
            expect(userRepo).toBeDefined()

            let findOneEntitySpy = jest.spyOn(crudService, 'findOneEntity').mockImplementation(async (options: FindOptions<User>) => { return testUser })
            let updateSpy = jest.spyOn(userRepo, 'update').mockImplementation(async (id: string, user: User) => { return new UpdateResult() })

            await expect(service.updatePhoneNo("123", 0))
                .rejects
                .toThrow(HttpException)

            expect(findOneEntitySpy).toHaveBeenCalledTimes(0)
            expect(updateSpy).toHaveBeenCalledTimes(0)
        })

        it('should fail if User not Found', async () => {

            expect(service).toBeDefined()
            expect(crudService).toBeDefined()
            expect(userRepo).toBeDefined()

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

            expect(service).toBeDefined()
            expect(crudService).toBeDefined()
            expect(userRepo).toBeDefined()

            let findOneEntitySpy = jest.spyOn(crudService, 'findOneEntity').mockImplementation(async (options: FindOptions<User>) => { return testUser })
            let updateSpy = jest.spyOn(userRepo, 'update').mockImplementation(async (id: string, user: User) => { return new UpdateResult() })

            testUser.password = '123456'
            await service.update('123', testUser)

            expect(findOneEntitySpy).toHaveBeenCalled()
            expect(updateSpy).toHaveBeenCalled()
        })

        it('should fail if password is not provided', async () => {
            expect(service).toBeDefined()
            expect(crudService).toBeDefined()
            expect(userRepo).toBeDefined()

            let findOneEntitySpy = jest.spyOn(crudService, 'findOneEntity').mockImplementation(async (options: FindOptions<User>) => { return testUser })
            let updateSpy = jest.spyOn(userRepo, 'update').mockImplementation(async (id: string, user: User) => { return new UpdateResult() })

            await expect(service.update('123', testUser))
                .rejects
                .toThrow(HttpException)

            expect(findOneEntitySpy).toHaveBeenCalledTimes(0)
            expect(updateSpy).toHaveBeenCalledTimes(0)
        })

        it('should fail if password is not long enough (should be 6 chars)', async () => {
            expect(service).toBeDefined()
            expect(crudService).toBeDefined()
            expect(userRepo).toBeDefined()

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
            expect(service).toBeDefined()
            expect(crudService).toBeDefined()
            expect(userRepo).toBeDefined()

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
            expect(service).toBeDefined()
            expect(crudService).toBeDefined()
            expect(userRepo).toBeDefined()

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

            expect(service).toBeDefined()
            expect(crudService).toBeDefined()
            expect(userRepo).toBeDefined()

            let findOneEntitySpy = jest.spyOn(crudService, 'findOneEntity').mockImplementation(async (options: FindOptions<User>) => { return testUser })
            let updateSpy = jest.spyOn(userRepo, 'update').mockImplementation(async (id: string, user: User) => { return new UpdateResult() })

            await service.updateAbout('123', 'a valid about text')

            expect(findOneEntitySpy).toHaveBeenCalled()
            expect(updateSpy).toHaveBeenCalled()
        })

        it('should fail if user id not specified', async () => {

            expect(service).toBeDefined()
            expect(crudService).toBeDefined()
            expect(userRepo).toBeDefined()

            let findOneEntitySpy = jest.spyOn(crudService, 'findOneEntity').mockImplementation(async (options: FindOptions<User>) => { return testUser })
            let updateSpy = jest.spyOn(userRepo, 'update').mockImplementation(async (id: string, user: User) => { return new UpdateResult() })

            await expect(service.updateAbout(null, 'a valid about text'))
                .rejects
                .toThrow(HttpException)

            expect(findOneEntitySpy).toHaveBeenCalledTimes(0)
            expect(updateSpy).toHaveBeenCalledTimes(0)
        })

        it('should fail if User not Found', async () => {

            expect(service).toBeDefined()
            expect(crudService).toBeDefined()
            expect(userRepo).toBeDefined()

            let findOneEntitySpy = jest.spyOn(crudService, 'findOneEntity').mockImplementation(async (options: FindOptions<User>) => { return null })
            let updateSpy = jest.spyOn(userRepo, 'update').mockImplementation(async (id: string, user: User) => { return new UpdateResult() })

            await expect(service.updateAbout('123', 'a valid about text'))
                .rejects
                .toThrow(HttpException)

            expect(findOneEntitySpy).toHaveBeenCalled()
            expect(updateSpy).toHaveBeenCalledTimes(0)
        })
    })
})
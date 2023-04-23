import { Request, Response } from 'express';
import  { AuthMiddleware }  from './auth.middleware';
import { Test, TestingModule } from '@nestjs/testing';
import axios, { AxiosStatic } from 'axios'

jest.mock('axios')
const mockAxios = axios as AxiosMock
interface AxiosMock extends AxiosStatic {
  mockResolvedValue: Function
  mockRejectedValue: Function
}

describe('AuthorizationMiddleware', () => {
  let authMiddleware: AuthMiddleware;
  
  const requestMockWithInvalidToken = {
    body: {},
    headers: { authorization: 'Bearer seyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIyTGYtamFReXZmQTNCN3dpVHZ3VkxhMjV1cHhiXzUtQXhZSDhmY3kySHhVIn0.eyJleHAiOjE2ODE5OTkyODYsImlhdCI6MTY4MTk5ODk4NiwianRpIjoiMDI3N2Q4YjYtN2Q0My00NmRlLThiYTgtNzcxNGQ3ZDg3NGM1IiwiaXNzIjoiaHR0cHM6Ly9hY2NvdW50cy5zZWd1cm9zLnZpdHRhLmNvbS5ici9hdXRoL3JlYWxtcy9jYXJlZXJzIiwic3ViIjoiNzk0ZmFkNjktMzkxNy00OThmLThhNjUtMWVjZGU5NjlmMGRiIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiY3VzdG9tZXJzIiwiYWNyIjoiMSIsInJlc291cmNlX2FjY2VzcyI6eyJjdXN0b21lcnMiOnsicm9sZXMiOlsidXNlciJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJjbGllbnRJZCI6ImN1c3RvbWVycyIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY2xpZW50SG9zdCI6IjEwLjUwLjIuMTcxIiwicHJlZmVycmVkX3VzZXJuYW1lIjoic2VydmljZS1hY2NvdW50LWN1c3RvbWVycyIsImNsaWVudEFkZHJlc3MiOiIxMC41MC4yLjE3MSJ9.cbQeHntnYBGzJryPb6jl-BmVC9Q_niOTK1S3JoRPyYd3PZCLmmmVMSztBmvk35hznEOJC8wzeWGtDsnesig8_KVbf-eDin0dECTckqgcaovcfCPFkkxQaknagwfOL3TCaaLrjvJO7vISaScEPtE07Uhil3jbNjov2WiWukryF8eMHcGADwWTtXGbbUdF2fjA3dlUueDS6J-I3IN0AlMYObq2prmu1nyawmDozOsfNtvNX_vFA_--z0AhAenwVPrVaWHbWzHgN5Ks4r0WZvH0PcMTc9-T9yiXPy_AAVP3jS30RRvda0EFtpJBOpr2xzj-qCY2B-dWeSzia5WjKe1moA'}
  } as unknown as Request
 
  const requestMockWithValidToken = {
    body: {},
    headers: { authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIyTGYtamFReXZmQTNCN3dpVHZ3VkxhMjV1cHhiXzUtQXhZSDhmY3kySHhVIn0.eyJleHAiOjE2ODE5OTkyODYsImlhdCI6MTY4MTk5ODk4NiwianRpIjoiMDI3N2Q4YjYtN2Q0My00NmRlLThiYTgtNzcxNGQ3ZDg3NGM1IiwiaXNzIjoiaHR0cHM6Ly9hY2NvdW50cy5zZWd1cm9zLnZpdHRhLmNvbS5ici9hdXRoL3JlYWxtcy9jYXJlZXJzIiwic3ViIjoiNzk0ZmFkNjktMzkxNy00OThmLThhNjUtMWVjZGU5NjlmMGRiIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiY3VzdG9tZXJzIiwiYWNyIjoiMSIsInJlc291cmNlX2FjY2VzcyI6eyJjdXN0b21lcnMiOnsicm9sZXMiOlsidXNlciJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJjbGllbnRJZCI6ImN1c3RvbWVycyIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY2xpZW50SG9zdCI6IjEwLjUwLjIuMTcxIiwicHJlZmVycmVkX3VzZXJuYW1lIjoic2VydmljZS1hY2NvdW50LWN1c3RvbWVycyIsImNsaWVudEFkZHJlc3MiOiIxMC41MC4yLjE3MSJ9.cbQeHntnYBGzJryPb6jl-BmVC9Q_niOTK1S3JoRPyYd3PZCLmmmVMSztBmvk35hznEOJC8wzeWGtDsnesig8_KVbf-eDin0dECTckqgcaovcfCPFkkxQaknagwfOL3TCaaLrjvJO7vISaScEPtE07Uhil3jbNjov2WiWukryF8eMHcGADwWTtXGbbUdF2fjA3dlUueDS6J-I3IN0AlMYObq2prmu1nyawmDozOsfNtvNX_vFA_--z0AhAenwVPrVaWHbWzHgN5Ks4r0WZvH0PcMTc9-T9yiXPy_AAVP3jS30RRvda0EFtpJBOpr2xzj-qCY2B-dWeSzia5WjKe1moA'}
  } as unknown as Request
  
  const next = jest.fn();
  
  const requestMock = {
    body: {}
  } as unknown as Request
  
  const statusResponseMock = {
    send: jest.fn((x) => x),
  }

  const responseMock = {
    status: jest.fn((x)=> statusResponseMock ),
    send: jest.fn((y)=> y)
  } as unknown as Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
        controllers: [AuthMiddleware]
    }).compile();
    authMiddleware = module.get<AuthMiddleware>(AuthMiddleware);
  });

  it('should be defined', async () => {
   expect(authMiddleware).toBeDefined();
  });
 
  it('should return 401 unauthorized when send request without token', () => {
    authMiddleware.use(requestMock, responseMock, next);
    expect(responseMock.status).toHaveBeenCalledWith(401);
    expect(statusResponseMock.send).toHaveBeenCalledWith({
      'statusCode': 401,
      'message': 'não autorizado',
      'error': 'Unauthorized'
    });
  });

  it('should return 401 unauthorized when send request with invalid token', () => {
    authMiddleware.use(requestMockWithInvalidToken, responseMock, next);
    expect(responseMock.status).toHaveBeenCalledWith(401);
    expect(statusResponseMock.send).toHaveBeenCalledWith({
      'statusCode': 401,
      'message': 'não autorizado',
      'error': 'Unauthorized'
    });
  });

  it('should call axios resolved mock', () => {
    mockAxios.mockResolvedValue({})
    authMiddleware.use(requestMockWithValidToken, responseMock, next);
    expect(mockAxios).toHaveBeenCalled();
  });
});
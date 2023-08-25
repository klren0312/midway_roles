import { MidwayConfig, MidwayAppInfo } from '@midwayjs/core';
import { SequelizeAdapter } from 'casbin-sequelize-adapter';

export default (appInfo: MidwayAppInfo) => {
  return {
    // use for cookie sign key, should change to your own and keep security
    keys: appInfo.name + '_1692942801977_5380',
    egg: {
      port: 7001,
    },
    // security: {
    //   csrf: false,
    // },
    zrole: {
      useAdapter: true,
      useAnonymous: false,
      usePolicyInit: true,
      model: 'roleConfig/model.conf',
      getUser: ctx => {
        if (ctx.headers.authorization) {
          return ctx.headers.authorization;
        }
        return null;
      },
      useAutoMiddleware: true,
      useSuperManage: 'superAdmin',
      adapterConfig: async () => {
        const connect = await SequelizeAdapter.newAdapter(
          {
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'root',
            dialect: 'mysql',
            database: 'role',
          },
          true
        );
        return connect;
      },
      initPolicy: zrole => {
        zrole.addPolicy('xdd', '/', 'GET');
        zrole.addPolicy('xdd', '/remove', 'GET');
      },
    },
  } as MidwayConfig;
};

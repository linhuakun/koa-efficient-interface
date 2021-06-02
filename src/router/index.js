const fs = require('fs');
//遍历router下所有文件
const useRoutes = (app)=>{
    fs.readdirSync(__dirname).forEach(file=>{
        if(file === 'index.js') return;
        const router =require(`./${file}`);
        app.use(router.routes());
        app.use(router.allowedMethods())
    })
};

module.exports=useRoutes;

import express, {Request, Response, NextFunction} from 'express';

import todoRoutes from './routes/todus';

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/api', todoRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {

});


app.listen(3000, () => {
    console.log('server started at port 3000'); 
})
import 'reflect-metadata'
import Container, { Service } from 'typedi';

@Service() 
class Server {
    init() {
        console.log('Server started');
    }
}

Container.get(Server).init()
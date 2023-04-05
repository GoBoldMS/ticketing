import request from 'supertest';
import { app } from '../../app'
import { signin } from '../../test/auth-handler';



const createTicket = () => {
    return request(app)
        .post('/api/tickets')
        .set('Cookie', signin())
        .send({
            title: 'adfsfd',
            price: 20
        });
};


it('can fetch  a list of tickets', async () => {

    await createTicket();
    await createTicket();
    await createTicket();

    const res = await request(app)
        .get('/api/tickets')
        .send()
        .expect(200);

        expect(res.body.length).toEqual(3)

});
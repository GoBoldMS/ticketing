import { Ticket } from '../ticket';

it('implements optimistic concurrency control', async () => {

    const ticket = Ticket.build({
        title: 'concert',
        price: 5,
        userId: '123'
    });

    await ticket.save();

    const firstInstance = await Ticket.findById(ticket.id);
    const secondInstance = await Ticket.findById(ticket.id);



    firstInstance?.set({ price: 40 });
    secondInstance?.set({ price: 65 });

    await firstInstance?.save();


    try {
        await secondInstance?.save();
    } catch (err) {
        return;
    };
})

it('increments the version number on multiple saves',async () => {
    const ticket = Ticket.build({
        title: 'concert',
        price: 5,
        userId: '123'
    });

    await ticket.save();
    expect(ticket.version).toEqual(0);
    await ticket.save();
    expect(ticket.version).toEqual(1);
    await ticket.save();
    expect(ticket.version).toEqual(2);
})
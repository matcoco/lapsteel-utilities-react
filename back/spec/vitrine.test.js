const request = require('supertest');
const app = require('../app');
const uri = '/api/vitrine';

describe('CRUD route vitrine', () => {
   
    const obj = {
        id:""
    }

    test('devrait retourner status code : 200 (POST) et la propriete url correcte', (done) => {
        request(app)
            .post(uri)
            .send({
                category:"test@test.com",
                type:"type1!",
                description:"france"
            })
            .end((err, res) => {
                if(err){
                    return done (err);
                }else{
                    expect(res.body[0].category).toBe("test@test.com");
                    expect(res.body[0].type).toBe("type1!");
                    expect(res.body[0].description).toBe("france");
                    expect(res.status).toBe(200);
                    done();
                }
            });
    });

    test('devrait retourner le status code 200 pour la méthode (GET)', (done) => {
        return request(app).get(uri).then(response => {
            expect(response.statusCode).toBe(200);
            let array = (JSON.parse(response.text));
            if(array.length !== 0){
                obj.id = array[array.length - 1].id
            }else{
                obj.id = 1;
            }
            done();
        })
    });

    test('devrait retourner status code : 200 (GET) avec l\'id correct ', (done) => {
        request(app)
            .get(uri + `/${obj.id}`)
            .set('Accept', 'application/json')
            .end((err,res) => {
                if(err){
                    return done (err);
                }else{
                    expect(res.body[0].id).toBe(obj.id);
                    expect(res.body[0].category).toBe("test@test.com");
                    expect(res.body[0].type).toBe("type1!");
                    expect(res.body[0].description).toBe("france");
                    expect(res.status).toBe(200);
                    done();
                }
            });
        })

    test('devrait retourner status code : 200 (PUT) et la propriete url correctement modifiée', (done) => {

        request(app)
            .put(uri + `/${obj.id}`)
            .send({category:"category_modifie@test.fr", type: "MDPmodifie", description:"allemagne"})
            .set('Accept', 'application/json')
            .end((err,res) => {
                if(err){
                    return done (err);
                }else{
                    expect(res.request._data.category).toBe("category_modifie@test.fr");
                    expect(res.request._data.type).toBe("MDPmodifie");
                    expect(res.request._data.description).toBe("allemagne");
                    expect(res.status).toBe(200);
                    done();
                }
                
            });
        });

    test('devrait retourner status code : 200 (DELETE) et la l\'objet par id doit etre supprimé', (done) => {

        request(app)
            .delete(uri + `/${obj.id}`)
            .end((err, res) => {
                if(err){
                    return done (err);
                }else{
                    expect(res.status).toBe(200);
                    done();
            }
        })
    });
});
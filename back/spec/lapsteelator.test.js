const request = require('supertest');
const app = require('../app');
const uri = '/api/lapsteelator';

describe('CRUD route user', () => {
   
    const obj = {
        id:""
    }

    test('devrait retourner status code : 200 (POST) et la propriete url correcte', (done) => {
        request(app)
            .post(uri)
            .send({liste_mode:"mode2:1t 1t 1t,mode3:1.5t 1.5t 1.5t"})
            .end((err, res) => {
                if(err){
                    return done (err);
                }else{
                    expect(res.body[0].liste_mode).toBe("mode2:1t 1t 1t,mode3:1.5t 1.5t 1.5t");
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
                obj.id = array[0].id
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
                    expect(res.body[0].liste_mode).toBe("mode2:1t 1t 1t,mode3:1.5t 1.5t 1.5t");
                    expect(res.status).toBe(200);
                    done();
                }
            });
        })

    test('devrait retourner status code : 200 (PUT) et la propriete url correctement modifiée', (done) => {

        request(app)
            .put(uri + `/${obj.id}`)
            .send({liste_mode:"mode3:1t 1t 1t,mode4:1.5t 1.5t 1.5t"})
            .set('Accept', 'application/json')
            .end((err,res) => {
                if(err){
                    return done (err);
                }else{
                    expect(res.request._data.liste_mode).toBe("mode3:1t 1t 1t,mode4:1.5t 1.5t 1.5t");
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
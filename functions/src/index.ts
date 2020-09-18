import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

exports.createUser = functions.firestore
    .document('users/{userId}')
    .onCreate(async (snap, context) => {
        const user = snap.data();

        await admin.auth().createUser({
            uid: context.params['userId'],
            email: user.email,
            password: user.password,
            disabled: false,
        });
        const ref = admin.firestore().doc('counters/user');
        await ref.update({ total: admin.firestore.FieldValue.increment(1) })
        return snap.ref.update({ id: context.params['userId'], password: null })
    });

exports.deleteUser = functions.firestore
    .document('users/{userID}')
    .onDelete(async (snap, context) => {
        await admin.auth().deleteUser(context.params['userId']);
        await admin.firestore().collection('counters').doc('user').update({ total: admin.firestore.FieldValue.increment(-1) })
    });
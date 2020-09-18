import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

exports.createUser = functions.firestore
    .document('users/{userId}')
    .onCreate(async (snap, context) => {
        const user = snap.data();
        console.log(user, context.params['userId']);
        try {
            await admin.auth().createUser({
                uid: context.params['userId'],
                email: user.email,
                password: user.password,
                disabled: false,
            });
            return snap.ref.update({ id: context.params['userId'] })
        }
        catch (err) {
            console.log(err);
        }
        return;
    });

exports.deleteUser = functions.firestore
    .document('users/{userID}')
    .onDelete(async (snap, context) => {
        await admin.auth().deleteUser(context.params['userId']);
    });
const db = require('../database/staff_database');
const {hash} = require('./conversion_functions');

exports.login = async (req, res) => {
  const email = req.body.email;
  const salt = await db.getStaffSalt(email);
  const password = hash(req.body.password, salt)[0];

  if (!email || !password) {
    res.status(400).json({message: 'Invalid input'}).end();
    return;
  }

  const result = await db.login(email, password);

  if (!result) {
    res.status(500).json({message: 'Internal server error'}).end();
  } else if (!result.staff_id) {
    res.status(401).json({message: 'Invalid email or password'}).end();
  } else {
    const staff = {
      id: result.staff_id,
      branch_id: result.branch_id,
      role: result.role,
      user: {
        id: result.id,
        name: result.name,
        phone_number: result.phone_number,
        email: result.email,
      },
      address: {
        id: result.address_id,
        street_number: result.street_number,
        street_name: result.street_name,
        city: result.city,
        province: result.province,
        postal_code: result.postal_code,
        country: result.country,
      }
    }

    res.status(200).json(staff).end();
  }
}

exports.create = async (req, res) => {
  const staff = req.body;

  const hashed = hash(staff.user.password);
  staff.user.password = hashed[0];
  staff.user.salt = hashed[1];

  if (!staff.address.street_number || !staff.address.street_name || !staff.address.city || !staff.address.province || !staff.address.postal_code ||
      !staff.user.name || !staff.user.phone_number || !staff.user.email ||  !staff.user.date_of_birth || !staff.user.password || !staff.user.salt ||
      !staff.staff_role_id || !staff.branch_id) {
    res.status(400).json({message: 'Invalid input'}).end();
    return;
  }

  const result = await db.createStaffMember(staff);

  if (!result) {
    res.status(500).json({message: 'Internal server error'}).end();
  } else {
    delete staff.user.password;
    delete staff.user.salt;

    staff.id = result.staff_id;
    staff.user.id = result.user_id;
    staff.address.id = result.address_id;

    res.status(200).json(staff).end();
  }
}

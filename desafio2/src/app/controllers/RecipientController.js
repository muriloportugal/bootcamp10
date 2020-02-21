import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string()
        .strict()
        .required(),
      street: Yup.string()
        .strict()
        .required(),
      number: Yup.number()
        .required()
        .positive()
        .integer(),
      complement: Yup.string().ensure(),
      state: Yup.string()
        .strict()
        .required(),
      city: Yup.string()
        .strict()
        .required(),
      zip_code: Yup.number()
        .required()
        .positive()
        .integer(),
    });

    if (
      !(await schema.isValid({
        name: req.body.name,
        street: req.body.street,
        number: req.body.number,
        complement: req.body.complement,
        state: req.body.state,
        city: req.body.city,
        zip_code: req.body.zip_code,
      }))
    ) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    const { name, street, number, state, city, zip_code } = req.body;
    const complement = req.body.complement || null;
    const recipientExists = await Recipient.findOne({
      where: {
        name,
        street,
        number,
        complement,
        state,
        city,
        zip_code,
      },
    });
    if (recipientExists) {
      return res.status(400).json({ error: 'Recipient already exists' });
    }
    const { id } = await Recipient.create(req.body);

    return res.json({
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      zip_code,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string()
        .strict()
        .required(),
      street: Yup.string()
        .strict()
        .required(),
      number: Yup.number()
        .required()
        .positive()
        .integer(),
      complement: Yup.string().ensure(),
      state: Yup.string()
        .strict()
        .required(),
      city: Yup.string()
        .strict()
        .required(),
      zip_code: Yup.number()
        .required()
        .positive()
        .integer(),
    });

    if (
      !(await schema.isValid({
        name: req.body.name,
        street: req.body.street,
        number: req.body.number,
        complement: req.body.complement,
        state: req.body.state,
        city: req.body.city,
        zip_code: req.body.zip_code,
      }))
    ) {
      return res.status(400).json({ error: 'Validations fails' });
    }


  }
}

export default new RecipientController();

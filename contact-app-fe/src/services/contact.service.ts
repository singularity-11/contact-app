import { ContactModel } from "../models/ContactModel";
import request, { Methods } from "../util/request";

class ContactService {
  async createContact(data: ContactModel) {
    const requestConfig = {
      method: Methods.POST,
      data,
      resource: `contacts`,
    };

    return request<ContactModel>(requestConfig);
  }

  async getContact(id: number) {
    return request<ContactModel>({
      resource: `contacts/${id}`,
      method: Methods.GET,
    });
  }

  async getContacts() {
    return request<Partial<ContactModel>[]>({
      resource: "contacts",
      method: Methods.GET,
    });
  }

  async updateContact(id: number, data: ContactModel) {
    const requestConfig = {
      method: Methods.PUT,
      data,
      resource: `contacts/${id}`,
    };

    return request<ContactModel>(requestConfig);
  }

  async deleteContact(id: number) {
    return request({ method: Methods.DELETE, resource: `contacts/${id}` });
  }
}

export const contactService = new ContactService();

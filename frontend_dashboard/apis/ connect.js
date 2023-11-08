import axios from 'axios';

const apiRoot = axios.create({
    baseURL : 'localhost:3500'
})

export const getAllruleset = async () => {
    try{
        const {data} = await apiRoot.get('');
        return data;
    }
    catch (error){
        throw error;
    }
}
export const getruleAPi = async(ruleset) => {
    try{
        const {data} = await apiRoot.get('/${ruleset}')
        return data;
    }
    catch (error){
        throw error;
    }
}
export const create_ruleset = async () => {
    try {
      const { data } = await apiRoot.post('', {
        "Action": "",
        "Protocol": "",
        "Source IP": "",
        "Destination IP": "",
        "MSG": "",
        "SID": ""
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return data;
    } catch (error) {
      throw error;
    }
  };
  export const putruleset = async (ruleset) => {
    try {
      const { data } = await apiRoot.put(`/${ruleset}`, {
        "Action": "",
        "Protocol": "",
        "Source IP": "",
        "Destination IP": "",
        "MSG": "",
        "SID": ""
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return data;
    } catch (error) {
      throw error;
    }
  };
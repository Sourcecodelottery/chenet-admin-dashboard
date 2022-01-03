import { Card } from '@mui/material';
import { ISurveyJSX } from 'src/models/survey_model';
import RecentOrdersTable from './RecentSurveysTable';
import { FetchSurveys } from "../../store/States/Survey"
import { useEffect, useState } from 'react';
import { ISurvey } from 'src/store/States/Survey/survey.types';

function RecentOrders() {
  const [fetchedSurveys, setFetchedSurveys] = useState<ISurvey[]>([])
  const cryptoOrders: ISurveyJSX[] = [
    {
      id: '1',
      title: 'Fiat Deposit',
      ageLimit: 'new Date().getTime()',
      completedSurveys: 10,
      gender: 'VUVX709ET7BY',
      surveyType: 'Bank Account',
      sourceDesc: '*** 1111',
      country: '34.4565',
      amount: 56787,
      region: 'ETH',
      zone: '$',
    },
    {
      id: '2',
      title: 'Fiat Deposit',
      ageLimit: 'subDays(new Date(), 1).getTime()',
      completedSurveys: 10,
      gender: '23M3UOG65G8K',
      surveyType: 'Bank Account',
      sourceDesc: '*** 1111',
      country: '6.58454334',
      amount: 8734587,
      region: 'BTC',
      zone: '$',
    },
    {
      id: '3',
      title: 'Fiat Deposit',
      ageLimit: 'subDays(new Date(), 5).getTime()',
      completedSurveys: 10,
      gender: 'F6JHK65MS818',
      surveyType: 'Bank Account',
      sourceDesc: '*** 1111',
      country: '6.58454334',
      amount: 8734587,
      region: 'BTC',
      zone: '$',
    },
    {
      id: '4',
      title: 'Fiat Deposit',
      ageLimit: 'subDays(new Date(), 55).getTime()',
      completedSurveys: 10,
      gender: 'QJFAI7N84LGM',
      surveyType: 'Bank Account',
      sourceDesc: '*** 1111',
      country: '6.58454334',
      amount: 8734587,
      region: 'BTC',
      zone: '$',
    },
    {
      id: '5',
      title: 'Fiat Deposit',
      ageLimit: 'subDays(new Date(), 56).getTime()',
      completedSurveys: 10,
      gender: 'BO5KFSYGC0YW',
      surveyType: 'Bank Account',
      sourceDesc: '*** 1111',
      country: '6.58454334',
      amount: 8734587,
      region: 'BTC',
      zone: '$',
    },
    {
      id: '6',
      title: 'Fiat Deposit',
      ageLimit: 'subDays(new Date(), 33).getTime()',
      completedSurveys: 10,
      gender: '6RS606CBMKVQ',
      surveyType: 'Bank Account',
      sourceDesc: '*** 1111',
      country: '6.58454334',
      amount: 8734587,
      region: 'BTC',
      zone: '$',
    },
    {
      id: '7',
      title: 'Fiat Deposit',
      ageLimit: 'new Date().getTime()',
      completedSurveys: 10,
      gender: '479KUYHOBMJS',
      surveyType: 'Bank Account',
      sourceDesc: '*** 1212',
      country: '2.346546',
      amount: 234234,
      region: 'BTC',
      zone: '$',
    },
    {
      id: '8',
      title: 'Paypal Withdraw',
      ageLimit: 'subDays(new Date(), 22).getTime()',
      completedSurveys: 10,
      gender: 'W67CFZNT71KR',
      surveyType: 'Paypal Account',
      sourceDesc: '*** 1111',
      country: '3.345456',
      amount: 34544,
      region: 'BTC',
      zone: '$',
    },
    {
      id: '9',
      title: 'Fiat Deposit',
      ageLimit: 'subDays(new Date(), 11).getTime()',
      completedSurveys: 10,
      gender: '63GJ5DJFKS4H',
      surveyType: 'Bank Account',
      sourceDesc: '*** 2222',
      country: '1.4389567945',
      amount: 123843,
      region: 'BTC',
      zone: '$',
    },
    {
      id: '10',
      title: 'Wallet Transfer',
      ageLimit: 'subDays(new Date(), 123).getTime()',
      completedSurveys: 10,
      gender: '17KRZHY8T05M',
      surveyType: 'Wallet Transfer',
      sourceDesc: "John's Cardano Wallet",
      country: '765.5695',
      amount: 7567,
      region: 'ADA',
      zone: '$',
    }
  ];

  useEffect(() => {
    FetchSurveys({}, (err: any, data: ISurvey[]) => {
      if (err) throw err
      setFetchedSurveys(data)
    })
  }, [setFetchedSurveys])

  const resolveSurveys = () => {
    return fetchedSurveys.map(survey => {
      let countryString = ''
      let regionString = ''
      let zoneString = ''
      survey.demographicDetails.country.forEach(country => countryString += country + ", ")
      survey.demographicDetails.region.forEach(region => regionString += region + ", ")
      survey.demographicDetails.zone.forEach(zone => zoneString += zone + ", ")
      return {
        ...cryptoOrders[0],
        ...survey,
        ageLimit: `From ${survey.ageLimit.min} to ${survey.ageLimit.max}`,
        country: countryString.replace(", ", " "),
        region: regionString.replace(", ", " "),
        zone: zoneString.replace(", ", " "),
        completedSurveys: survey.consumerUsers.length,
        id: survey._id
      }
    })
  }

  return (
    <Card>
      <RecentOrdersTable cryptoOrders={resolveSurveys()} />
    </Card>
  );
}

export default RecentOrders;

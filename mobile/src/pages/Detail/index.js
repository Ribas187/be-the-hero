/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';

import {
  Container,
  Header,
  LogoImg,
  BackButton,
  Incident,
  IncidentProperty,
  IncidentValue,
  ContactBox,
  HeroTitle,
  HeroDescription,
  Actions,
  ActionsButton,
  ActionButtonText,
} from './styles';

import logoImg from '../../assets/logo.png';

export default function Detail() {
  const navigation = useNavigation();
  const route = useRoute();

  const { incident } = route.params;
  const message = `Olá ${
    incident.name
  }, estou entrando em contato pois gostaria de ajudarno caso "${
    incident.title
  }" com o valor de ${Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(incident.value)}`;

  function navigateBack() {
    navigation.goBack();
  }

  function sendMail() {
    MailComposer.composeAsync({
      subject: `Herói do caso: ${incident.title}`,
      recipients: [incident.email],
      body: message,
    });
  }

  function sendWhatsApp() {
    Linking.openURL(
      `whatsapp://send?phone=55${incident.whatsapp}&text=${message}`
    );
  }

  return (
    <Container>
      <Header>
        <LogoImg source={logoImg} />

        <BackButton onPress={navigateBack}>
          <Feather name="arrow-left" size={28} color="#e02041" />
        </BackButton>
      </Header>

      <Incident>
        <IncidentProperty style={{ marginTop: 0 }}>ONG:</IncidentProperty>
        <IncidentValue>
          {incident.name} de {incident.city}/{incident.uf}
        </IncidentValue>

        <IncidentProperty>CASO:</IncidentProperty>
        <IncidentValue>{incident.description}</IncidentValue>

        <IncidentProperty>VALOR:</IncidentProperty>
        <IncidentValue>
          {Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(incident.value)}
        </IncidentValue>
      </Incident>

      <ContactBox>
        <HeroTitle>Salve o dia!</HeroTitle>
        <HeroTitle>Seja o herói desse caso.</HeroTitle>

        <HeroDescription>Entre em contato:</HeroDescription>

        <Actions>
          <ActionsButton onPress={sendWhatsApp}>
            <ActionButtonText>WhatsApp</ActionButtonText>
          </ActionsButton>

          <ActionsButton onPress={sendMail}>
            <ActionButtonText>E-mail</ActionButtonText>
          </ActionsButton>
        </Actions>
      </ContactBox>
    </Container>
  );
}

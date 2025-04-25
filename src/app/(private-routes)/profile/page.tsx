'use client';

import { useEffect, useState } from 'react';
import { redirect, useRouter } from 'next/navigation';
import { ProfileUserResponse } from '@/@types/response/profile';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Mail, MapPin, Home } from 'lucide-react';

export default function ProfilePage() {
  const [user, setUser] = useState<ProfileUserResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/user-profile');

        if (res.status === 401) {
          console.warn(
            'Token expirado ou inválido. Redirecionando para login...',
          );
          router.replace('/login');
          return;
        }

        if (!res.ok) {
          throw new Error('Erro inesperado ao buscar dados do usuário');
        }

        const data = await res.json();

        const profile = (data as any).user ?? data;
        setUser(profile);
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
        redirect('/login');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const getInitials = (name?: string) => {
    if (!name) return '';
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase();
  };

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p>Carregando...</p>
      </main>
    );
  }

  if (!user) return null;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 p-8">
      <div className="w-full max-w-3xl space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-blue-700">
            Olá {user.name}, você está na área logada
          </h1>
          <p className="text-gray-500">Bem-vindo à sua área pessoal</p>
        </div>

        <Card className="border-blue-100 shadow-lg">
          <CardHeader className="flex flex-row items-center gap-4 pb-2">
            <Avatar className="h-16 w-16 border-2 border-blue-200">
              <AvatarImage
                src="/placeholder.svg?height=64&width=64"
                alt={user.name}
              />
              <AvatarFallback className="bg-blue-600 text-xl text-white">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{user.name}</CardTitle>
              <CardDescription>Perfil do Usuário</CardDescription>
            </div>
            <Badge className="ml-auto bg-blue-600 hover:bg-blue-700">
              Ativo
            </Badge>
          </CardHeader>

          <CardContent className="pt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="border-b pb-2 text-lg font-medium">
                  Informações Pessoais
                </h3>
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-blue-100 p-2">
                    <Mail className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="border-b pb-2 text-lg font-medium">Endereço</h3>

                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-blue-100 p-2">
                    <MapPin className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Cidade/Estado</p>
                    <p className="font-medium">
                      {user.address_attributes.city} –{' '}
                      {user.address_attributes.state}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-blue-100 p-2">
                    <Home className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">CEP</p>
                    <p className="font-medium">
                      {user.address_attributes.zip_code}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-lg border border-blue-100 bg-blue-50 p-4">
              <p className="text-center text-blue-700">
                Seus dados estão seguros e protegidos. Obrigado por confiar em
                nossos serviços!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

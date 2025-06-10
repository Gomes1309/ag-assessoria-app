import React, { useState } from 'react';
import { 
  FileText, 
  User, 
  Home, 
  Bell, 
  Settings, 
  Download, 
  Upload, 
  Calculator, 
  CreditCard, 
  AlertCircle,
  CheckCircle,
  Clock,
  Phone,
  Mail,
  Globe,
  ChevronRight,
  Plus,
  Search,
  Filter
} from 'lucide-react';

const AGAssessoriaApp = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [userRole, setUserRole] = useState('client');
  
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Declaração IR 2024 disponível', type: 'document', time: '2h atrás', read: false },
    { id: 2, title: 'Pagamento DAS em atraso', type: 'alert', time: '1 dia atrás', read: false },
    { id: 3, title: 'Balanço mensal processado', type: 'success', time: '3 dias atrás', read: true }
  ]);
  
  const documents = [
    { id: 1, name: 'Declaração IR 2024.pdf', type: 'IR', date: '2024-03-15', size: '2.1 MB' },
    { id: 2, name: 'Balanço Março 2024.pdf', type: 'Balanço', date: '2024-04-01', size: '1.8 MB' },
    { id: 3, name: 'DAS Abril 2024.pdf', type: 'DAS', date: '2024-04-20', size: '856 KB' },
    { id: 4, name: 'Folha Pagamento Mar.pdf', type: 'Folha', date: '2024-03-30', size: '1.2 MB' }
  ];

  const services = [
    { id: 1, name: 'Declaração de Imposto de Renda', desc: 'Pessoa Física e Jurídica' },
    { id: 2, name: 'Abertura de Empresa', desc: 'MEI, LTDA, SA' },
    { id: 3, name: 'Alteração Contratual', desc: 'Mudanças societárias' },
    { id: 4, name: 'Consultoria Tributária', desc: 'Planejamento fiscal' },
    { id: 5, name: 'Folha de Pagamento', desc: 'Gestão completa' },
    { id: 6, name: 'Baixa de Empresa', desc: 'Encerramento de atividades' }
  ];

  const [clients, setClients] = useState([
    { id: 1, name: 'João Silva', cnpj: '12.345.678/0001-90', email: 'joao@empresa.com', phone: '(11) 99999-9999', status: 'Ativo' },
    { id: 2, name: 'Maria Santos', cnpj: '98.765.432/0001-12', email: 'maria@loja.com', phone: '(11) 88888-8888', status: 'Ativo' },
    { id: 3, name: 'Pedro Costa', cnpj: '11.222.333/0001-44', email: 'pedro@comercio.com', phone: '(11) 77777-7777', status: 'Inativo' },
    { id: 4, name: 'Ana Oliveira', cnpj: '55.666.777/0001-88', email: 'ana@servicos.com', phone: '(11) 66666-6666', status: 'Ativo' }
  ]);

  const [showClientModal, setShowClientModal] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [clientForm, setClientForm] = useState({
    name: '',
    cnpj: '',
    email: '',
    phone: '',
    status: 'Ativo'
  });
  const [clientFilter, setClientFilter] = useState('Todos');
  const [showUploadModal, setShowUploadModal] = useState(false);

  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const getNotificationIcon = (type) => {
    if (type === 'alert') return <AlertCircle className="w-5 h-5 text-red-500" />;
    if (type === 'success') return <CheckCircle className="w-5 h-5 text-green-500" />;
    return <FileText className="w-5 h-5 text-blue-500" />;
  };

  // Funções de gestão de clientes
  const openClientModal = (client = null) => {
    if (client) {
      setEditingClient(client);
      setClientForm({
        name: client.name,
        cnpj: client.cnpj,
        email: client.email,
        phone: client.phone,
        status: client.status
      });
    } else {
      setEditingClient(null);
      setClientForm({
        name: '',
        cnpj: '',
        email: '',
        phone: '',
        status: 'Ativo'
      });
    }
    setShowClientModal(true);
  };

  const saveClient = () => {
    if (!clientForm.name || !clientForm.cnpj || !clientForm.email) {
      alert('Preencha todos os campos obrigatórios!');
      return;
    }

    if (editingClient) {
      setClients(prev => prev.map(client => 
        client.id === editingClient.id 
          ? { ...client, ...clientForm }
          : client
      ));
      alert('Cliente atualizado com sucesso!');
    } else {
      const newClient = {
        id: Date.now(),
        ...clientForm
      };
      setClients(prev => [...prev, newClient]);
      alert('Cliente cadastrado com sucesso!');
    }

    setShowClientModal(false);
    setEditingClient(null);
    setClientForm({
      name: '',
      cnpj: '',
      email: '',
      phone: '',
      status: 'Ativo'
    });
  };

  const deleteClient = (clientId) => {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      setClients(prev => prev.filter(client => client.id !== clientId));
      alert('Cliente excluído com sucesso!');
    }
  };

  const toggleClientStatus = (clientId) => {
    setClients(prev => prev.map(client => 
      client.id === clientId 
        ? { ...client, status: client.status === 'Ativo' ? 'Inativo' : 'Ativo' }
        : client
    ));
  };

  const filteredClients = clients.filter(client => {
    if (clientFilter === 'Todos') return true;
    return client.status === clientFilter;
  });

  // RENDERIZAÇÃO DAS TELAS

  const renderHome = () => (
    <div className="p-6 space-y-6">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
          <span className="text-white text-2xl font-bold">AG</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-800">AG Assessoria</h1>
        <p className="text-gray-600">Olá, João Silva</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Documentos</p>
              <p className="text-2xl font-bold">12</p>
            </div>
            <FileText className="w-8 h-8 text-blue-200" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Em dia</p>
              <p className="text-2xl font-bold">OK</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-200" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Ações Rápidas</h3>
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => setActiveTab('documents')}
            className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <FileText className="w-6 h-6 text-blue-600" />
            <span className="text-gray-700">Documentos</span>
          </button>
          <button 
            onClick={() => setActiveTab('services')}
            className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
          >
            <Plus className="w-6 h-6 text-purple-600" />
            <span className="text-gray-700">Solicitar</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Notificações Recentes</h3>
          <button 
            onClick={() => setActiveTab('notifications')}
            className="text-blue-600 text-sm"
          >
            Ver todas
          </button>
        </div>
        <div className="space-y-3">
          {notifications.slice(0, 2).map(notif => (
            <div key={notif.id} className={`flex items-start space-x-3 p-3 rounded-lg ${notif.read ? 'bg-gray-50' : 'bg-blue-50'}`}>
              {getNotificationIcon(notif.type)}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{notif.title}</p>
                <p className="text-xs text-gray-500">{notif.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-6 text-white">
        <h3 className="text-lg font-semibold mb-4">Precisa de Ajuda?</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5" />
            <span className="text-sm">(11) 9999-9999</span>
          </div>
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5" />
            <span className="text-sm">contato@agassessoriaonline.com.br</span>
          </div>
          <div className="flex items-center space-x-3">
            <Globe className="w-5 h-5" />
            <span className="text-sm">www.agassessoriaonline.com.br</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDocuments = () => (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Meus Documentos</h2>
        <div className="flex space-x-2">
          <button className="p-2 bg-gray-100 rounded-lg">
            <Search className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 bg-gray-100 rounded-lg">
            <Filter className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {['Todos', 'IR', 'DAS', 'Balanço', 'Folha'].map(filter => (
            <button 
              key={filter}
              className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm whitespace-nowrap hover:bg-blue-200 transition-colors"
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {documents.map(doc => (
          <div key={doc.id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-800 truncate">{doc.name}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{doc.date}</span>
                    <span>{doc.size}</span>
                    <span className="px-2 py-1 bg-gray-100 rounded text-xs">{doc.type}</span>
                  </div>
                </div>
              </div>
              <button className="p-2 bg-green-100 rounded-lg ml-3">
                <Download className="w-5 h-5 text-green-600" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors">
        <Upload className="w-5 h-5" />
        <span>Enviar Documento</span>
      </button>
    </div>
  );

  const renderServices = () => (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Solicitar Serviços</h2>
        <p className="text-gray-600">Escolha o serviço que você precisa</p>
      </div>

      <div className="grid gap-4">
        {services.map(service => (
          <div key={service.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Calculator className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{service.name}</h3>
                  <p className="text-sm text-gray-600">{service.desc}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-6 text-white">
        <h3 className="text-lg font-semibold mb-2">Atendimento Personalizado</h3>
        <p className="text-purple-100 text-sm mb-4">
          Não encontrou o que precisa? Entre em contato conosco para um atendimento personalizado.
        </p>
        <button className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-lg hover:bg-opacity-30 transition-colors">
          Falar com Consultor
        </button>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Notificações</h2>
      
      <div className="space-y-4">
        {notifications.map(notif => (
          <div 
            key={notif.id} 
            className={`bg-white rounded-lg shadow-md p-4 cursor-pointer transition-colors ${
              !notif.read ? 'border-l-4 border-blue-500' : ''
            }`}
            onClick={() => markAsRead(notif.id)}
          >
            <div className="flex items-start space-x-3">
              {getNotificationIcon(notif.type)}
              <div className="flex-1">
                <h3 className={`font-medium ${!notif.read ? 'text-gray-900' : 'text-gray-700'}`}>
                  {notif.title}
                </h3>
                <div className="flex items-center space-x-2 mt-1">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-500">{notif.time}</span>
                </div>
              </div>
              {!notif.read && (
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="p-6">
      <div className="text-center mb-8">
        <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
          <User className="w-12 h-12 text-gray-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">
          {userRole === 'accountant' ? 'Contador - AG Assessoria' : 'João Silva'}
        </h2>
        <p className="text-gray-600">
          {userRole === 'accountant' ? 'CRC: 1234567890' : 'CNPJ: 12.345.678/0001-90'}
        </p>
      </div>

      <div className="space-y-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="font-semibold text-gray-800 mb-3">Informações da Conta</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Email:</span>
              <span className="text-gray-800">
                {userRole === 'accountant' ? 'contador@agassessoriaonline.com.br' : 'joao@empresa.com'}
              </span>
            </div>
            <div className="flex justify-between">
              <span
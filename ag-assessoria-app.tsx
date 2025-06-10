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
              <span className="text-gray-600">Telefone:</span>
              <span className="text-gray-800">(11) 9999-9999</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">
                {userRole === 'accountant' ? 'Função:' : 'Plano:'}
              </span>
              <span className="text-green-600">
                {userRole === 'accountant' ? 'Administrador' : 'Premium'}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="font-semibold text-gray-800 mb-3">Configurações</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Notificações Push</span>
              <div className="w-12 h-6 bg-blue-600 rounded-full p-1">
                <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Notificações Email</span>
              <div className="w-12 h-6 bg-gray-300 rounded-full p-1">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        <button className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors">
          Sair da Conta
        </button>
      </div>
    </div>
  );

  const renderAccountantDashboard = () => (
    <div className="p-6 space-y-6">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
          <Calculator className="text-white text-2xl" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Painel do Contador</h1>
        <p className="text-gray-600">AG Assessoria Online</p>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-lg text-white">
          <div className="text-center">
            <p className="text-blue-100 text-sm">Clientes</p>
            <p className="text-2xl font-bold">{clients.length}</p>
          </div>
        </div>
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 rounded-lg text-white">
          <div className="text-center">
            <p className="text-orange-100 text-sm">Pendentes</p>
            <p className="text-2xl font-bold">3</p>
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-lg text-white">
          <div className="text-center">
            <p className="text-green-100 text-sm">Enviados</p>
            <p className="text-2xl font-bold">28</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Ações Rápidas</h3>
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => setActiveTab('accountant-clients')}
            className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <User className="w-6 h-6 text-blue-600" />
            <span className="text-gray-700">Clientes</span>
          </button>
          <button 
            onClick={() => setActiveTab('documents')}
            className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
          >
            <FileText className="w-6 h-6 text-green-600" />
            <span className="text-gray-700">Documentos</span>
          </button>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <button 
            onClick={() => setShowUploadModal(true)}
            className="w-full flex items-center justify-center space-x-3 p-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-colors"
          >
            <Calculator className="w-6 h-6" />
            <div className="text-left">
              <div className="font-semibold">Upload Inteligente com IA</div>
              <div className="text-sm text-purple-100">Organização automática por cliente</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  const renderAccountantClients = () => (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Gerenciar Clientes</h2>
        <button 
          onClick={() => openClientModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Novo Cliente</span>
        </button>
      </div>

      <div className="mb-4">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {['Todos', 'Ativo', 'Inativo'].map(filter => (
            <button 
              key={filter}
              onClick={() => setClientFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                clientFilter === filter 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-3 mb-4">
        <div className="flex items-center justify-between text-blue-800">
          <span className="font-medium">
            Total: {filteredClients.length} clientes
          </span>
          <div className="flex space-x-4 text-sm">
            <span>Ativos: {clients.filter(c => c.status === 'Ativo').length}</span>
            <span>Inativos: {clients.filter(c => c.status === 'Inativo').length}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {filteredClients.map(client => (
          <div 
            key={client.id} 
            className={`bg-white rounded-lg shadow-md p-4 border-l-4 ${
              client.status === 'Ativo' ? 'border-green-500' : 'border-red-500'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  client.status === 'Ativo' 
                    ? 'bg-gradient-to-br from-blue-500 to-purple-500' 
                    : 'bg-gray-400'
                }`}>
                  <span className="text-white font-bold text-lg">
                    {client.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{client.name}</h3>
                  <p className="text-sm text-gray-600">{client.cnpj}</p>
                  <p className="text-xs text-gray-500">{client.email}</p>
                  <p className="text-xs text-gray-500">{client.phone}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => toggleClientStatus(client.id)}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    client.status === 'Ativo' 
                      ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                      : 'bg-red-100 text-red-800 hover:bg-red-200'
                  } transition-colors`}
                >
                  {client.status}
                </button>
                <button 
                  onClick={() => openClientModal(client)}
                  className="p-2 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  <Settings className="w-4 h-4 text-blue-600" />
                </button>
                <button 
                  onClick={() => deleteClient(client.id)}
                  className="p-2 bg-red-100 rounded-lg hover:bg-red-200 transition-colors"
                >
                  <span className="text-red-600 font-bold">×</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTabContent = () => {
    if (userRole === 'accountant') {
      switch(activeTab) {
        case 'home': return renderAccountantDashboard();
        case 'accountant-clients': return renderAccountantClients();
        case 'documents': return renderDocuments();
        case 'profile': return renderProfile();
        default: return renderAccountantDashboard();
      }
    } else {
      switch(activeTab) {
        case 'home': return renderHome();
        case 'documents': return renderDocuments();
        case 'services': return renderServices();
        case 'notifications': return renderNotifications();
        case 'profile': return renderProfile();
        default: return renderHome();
      }
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-gray-50 min-h-screen">
      {/* Toggle de Usuário */}
      <div className="bg-gray-800 text-white p-2 text-center">
        <button 
          onClick={() => {
            setUserRole(userRole === 'client' ? 'accountant' : 'client');
            setActiveTab('home');
          }}
          className="text-xs bg-gray-700 px-3 py-1 rounded-full hover:bg-gray-600 transition-colors"
        >
          Alternar para: {userRole === 'client' ? 'Contador' : 'Cliente'}
        </button>
      </div>

      {/* Header */}
      <div className="bg-white shadow-sm p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`w-8 h-8 bg-gradient-to-br ${
            userRole === 'accountant' ? 'from-green-600 to-blue-600' : 'from-blue-600 to-purple-600'
          } rounded-lg flex items-center justify-center`}>
            <span className="text-white text-sm font-bold">AG</span>
          </div>
          <div>
            <span className="font-semibold text-gray-800">AG Assessoria</span>
            <p className="text-xs text-gray-500">
              {userRole === 'accountant' ? 'Painel do Contador' : 'Portal do Cliente'}
            </p>
          </div>
        </div>
        <div className="relative">
          <Bell 
            className="w-6 h-6 text-gray-600 cursor-pointer"
            onClick={() => setActiveTab('notifications')}
          />
          {userRole === 'client' && notifications.some(n => !n.read) && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="pb-20">
        {renderTabContent()}
      </div>

      {/* Modal Upload */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-lg">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">📁 Upload Inteligente</h3>
                  <p className="text-sm text-gray-600">Organize documentos automaticamente com IA</p>
                </div>
                <button 
                  onClick={() => setShowUploadModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors">
                <Upload className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-700">Arraste ou clique para adicionar</p>
                <p className="text-sm text-gray-500 mt-2">A IA identifica automaticamente cliente e tipo</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">💡 Dica para melhor identificação:</h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Inclua o nome do cliente: <code>joao_silva_IR_2024.pdf</code></li>
                  <li>• Ou o CNPJ: <code>12345678000190_DAS_maio.pdf</code></li>
                  <li>• Use palavras-chave: IR, DAS, balanco, folha, certidao</li>
                </ul>
              </div>

              <button 
                onClick={() => {
                  alert('🚀 Funcionalidade de IA em desenvolvimento!');
                  setShowUploadModal(false);
                }}
                className="w-full mt-4 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Calculator className="w-5 h-5" />
                <span>Organizar com IA</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Cliente */}
      {showClientModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-800">
                  {editingClient ? '✏️ Editar Cliente' : '➕ Novo Cliente'}
                </h3>
                <button 
                  onClick={() => setShowClientModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nome *</label>
                  <input
                    type="text"
                    value={clientForm.name}
                    onChange={(e) => setClientForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Ex: João Silva"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">CNPJ *</label>
                  <input
                    type="text"
                    value={clientForm.cnpj}
                    onChange={(e) => setClientForm(prev => ({ ...prev, cnpj: e.target.value }))}
                    placeholder="12.345.678/0001-90"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    value={clientForm.email}
                    onChange={(e) => setClientForm(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="joao@empresa.com"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
                  <input
                    type="text"
                    value={clientForm.phone}
                    onChange={(e) => setClientForm(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="(11) 99999-9999"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <div className="flex space-x-4">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        value="Ativo"
                        checked={clientForm.status === 'Ativo'}
                        onChange={(e) => setClientForm(prev => ({ ...prev, status: e.target.value }))}
                        className="text-green-600"
                      />
                      <span className="text-green-700">Ativo</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        value="Inativo"
                        checked={clientForm.status === 'Inativo'}
                        onChange={(e) => setClientForm(prev => ({ ...prev, status: e.target.value }))}
                        className="text-red-600"
                      />
                      <span className="text-red-700">Inativo</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button 
                  onClick={() => setShowClientModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  onClick={saveClient}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingClient ? "Salvar" : "Cadastrar"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-200">
        <div className="flex justify-around py-2">
          {userRole === 'accountant' ? (
            <>
              <button
                onClick={() => setActiveTab('home')}
                className={`flex flex-col items-center py-2 px-3 ${
                  activeTab === 'home' ? 'text-blue-600' : 'text-gray-400'
                }`}
              >
                <Home className={`w-6 h-6 ${activeTab === 'home' ? 'text-blue-600' : 'text-gray-400'}`} />
                <span className={`text-xs mt-1 ${activeTab === 'home' ? 'text-blue-600' : 'text-gray-400'}`}>
                  Início
                </span>
              </button>
              <button
                onClick={() => setActiveTab('accountant-clients')}
                className={`flex flex-col items-center py-2 px-3 ${
                  activeTab === 'accountant-clients' ? 'text-blue-600' : 'text-gray-400'
                }`}
              >
                <User className={`w-6 h-6 ${activeTab === 'accountant-clients' ? 'text-blue-600' : 'text-gray-400'}`} />
                <span className={`text-xs mt-1 ${activeTab === 'accountant-clients' ? 'text-blue-600' : 'text-gray-400'}`}>
                  Clientes
                </span>
              </button>
              <button
                onClick={() => setActiveTab('documents')}
                className={`flex flex-col items-center py-2 px-3 ${
                  activeTab === 'documents' ? 'text-blue-600' : 'text-gray-400'
                }`}
              >
                <FileText className={`w-6 h-6 ${activeTab === 'documents' ? 'text-blue-600' : 'text-gray-400'}`} />
                <span className={`text-xs mt-1 ${activeTab === 'documents' ? 'text-blue-600' : 'text-gray-400'}`}>
                  Documentos
                </span>
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex flex-col items-center py-2 px-3 ${
                  activeTab === 'profile' ? 'text-blue-600' : 'text-gray-400'
                }`}
              >
                <Settings className={`w-6 h-6 ${activeTab === 'profile' ? 'text-blue-600' : 'text-gray-400'}`} />
                <span className={`text-xs mt-1 ${activeTab === 'profile' ? 'text-blue-600' : 'text-gray-400'}`}>
                  Perfil
                </span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setActiveTab('home')}
                className={`flex flex-col items-center py-2 px-3 ${
                  activeTab === 'home' ? 'text-blue-600' : 'text-gray-400'
                }`}
              >
                <Home className={`w-6 h-6 ${activeTab === 'home' ? 'text-blue-600' : 'text-gray-400'}`} />
                <span className={`text-xs mt-1 ${activeTab === 'home' ? 'text-blue-600' : 'text-gray-400'}`}>
                  Início
                </span>
              </button>
              <button
                onClick={() => setActiveTab('documents')}
                className={`flex flex-col items-center py-2 px-3 ${
                  activeTab === 'documents' ? 'text-blue-600' : 'text-gray-400'
                }`}
              >
                <FileText className={`w-6 h-6 ${activeTab === 'documents' ? 'text-blue-600' : 'text-gray-400'}`} />
                <span className={`text-xs mt-1 ${activeTab === 'documents' ? 'text-blue-600' : 'text-gray-400'}`}>
                  Documentos
                </span>
              </button>
              <button
                onClick={() => setActiveTab('services')}
                className={`flex flex-col items-center py-2 px-3 ${
                  activeTab === 'services' ? 'text-blue-600' : 'text-gray-400'
                }`}
              >
                <Plus className={`w-6 h-6 ${activeTab === 'services' ? 'text-blue-600' : 'text-gray-400'}`} />
                <span className={`text-xs mt-1 ${activeTab === 'services' ? 'text-blue-600' : 'text-gray-400'}`}>
                  Serviços
                </span>
              </button>
              <button
                onClick={() => setActiveTab('notifications')}
                className={`flex flex-col items-center py-2 px-3 relative ${
                  activeTab === 'notifications' ? 'text-blue-600' : 'text-gray-400'
                }`}
              >
                <Bell className={`w-6 h-6 ${activeTab === 'notifications' ? 'text-blue-600' : 'text-gray-400'}`} />
                <span className={`text-xs mt-1 ${activeTab === 'notifications' ? 'text-blue-600' : 'text-gray-400'}`}>
                  Notificações
                </span>
                {notifications.some(n => !n.read) && (
                  <div className="absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full"></div>
                )}
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex flex-col items-center py-2 px-3 ${
                  activeTab === 'profile' ? 'text-blue-600' : 'text-gray-400'
                }`}
              >
                <User className={`w-6 h-6 ${activeTab === 'profile' ? 'text-blue-600' : 'text-gray-400'}`} />
                <span className={`text-xs mt-1 ${activeTab === 'profile' ? 'text-blue-600' : 'text-gray-400'}`}>
                  Perfil
                </span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AGAssessoriaApp;
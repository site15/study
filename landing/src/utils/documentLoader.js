// This utility loads markdown files from the public/docs directory
export const loadDocumentContent = async (folder, filename) => {
  try {
    // Fetch the markdown file from public/docs
    const response = await fetch(`/docs/${folder}/${filename}`);
    
    if (!response.ok) {
      throw new Error(`Failed to load document: ${response.status} ${response.statusText}`);
    }
    
    const content = await response.text();
    return content;
    
  } catch (error) {
    console.error('Error loading document:', error);
    return `# Document not found

Sorry, the document ${filename} in ${folder} could not be loaded.`;
  }
};

// Folder images mapping
const FOLDER_IMAGES = {
  '1_postgres': '/assets/images/folders/postgres.svg',
  '2_no_sql': '/assets/images/folders/nosql.svg',
  '3_redis': '/assets/images/folders/redis.svg',
  '4_rabbitmq': '/assets/images/folders/rabbitmq.svg',
  '5_kafka': '/assets/images/folders/kafka.svg',
  '6_microservice': '/assets/images/folders/microservice.svg',
  '7_ddd': '/assets/images/folders/ddd.svg',
  '8_nodejs': '/assets/images/folders/nodejs.svg',
  '9_алгоритмы': '/assets/images/folders/algorithms.svg',
  '10_system_design': '/assets/images/folders/system_design.svg'
};

// Get document structure from the actual docs directory
export const getFolderImage = (folderId) => {
  return FOLDER_IMAGES[folderId] || '/assets/images/folders/postgres.svg';
};

export const getDocumentStructure = () => {
  return {
    '1_postgres': [
      { id: '1_индексы.md', title: 'Индексы', image: '/assets/images/documents/database.svg' },
      { id: '2_индексы_вопросы.md', title: 'Индексы вопросы', image: '/assets/images/documents/database.svg' },
      { id: '3_индекс_b_tree.md', title: 'Индекс B-tree', image: '/assets/images/documents/database.svg' },
      { id: '4_составные_индексы.md', title: 'Составные индексы', image: '/assets/images/documents/database.svg' },
      { id: '5_изоляция_транзакций.md', title: 'Изоляция транзакций', image: '/assets/images/documents/database.svg' },
      { id: '6_ACID.md', title: 'ACID', image: '/assets/images/documents/database.svg' },
      { id: '7_explain.md', title: 'EXPLAIN', image: '/assets/images/documents/database.svg' },
      { id: '8_блокировки.md', title: 'Блокировки', image: '/assets/images/documents/database.svg' }
    ],
    '2_no_sql': [
      { id: '1_общее.md', title: 'Общее', image: '/assets/images/documents/concepts.svg' },
      { id: '2_eventual_consistency.md', title: 'Eventual Consistency', image: '/assets/images/documents/concepts.svg' }
    ],
    '3_redis': [
      { id: '1_общее.md', title: 'Общее', image: '/assets/images/documents/performance.svg' },
      { id: '2_distributed_lock.md', title: 'Distributed Lock', image: '/assets/images/documents/performance.svg' }
    ],
    '4_rabbitmq': [
      { id: '1_общее.md', title: 'Общее', image: '/assets/images/documents/performance.svg' },
      { id: '2_deadlocks.md', title: 'Deadlocks', image: '/assets/images/documents/performance.svg' }
    ],
    '5_kafka': [
      { id: '1_общее.md', title: 'Общее', image: '/assets/images/documents/performance.svg' },
      { id: '2_сравнение_с_другими.md', title: 'Сравнение с другими', image: '/assets/images/documents/performance.svg' }
    ],
    '6_microservice': [
      { id: '1_общее.md', title: 'Общее', image: '/assets/images/documents/architecture.svg' },
      { id: '2_подробности.md', title: 'Подробности', image: '/assets/images/documents/architecture.svg' }
    ],
    '7_ddd': [
      { id: '1_общее.md', title: 'Общее', image: '/assets/images/documents/architecture.svg' },
      { id: '2_примеры.md', title: 'Примеры', image: '/assets/images/documents/architecture.svg' }
    ],
    '8_nodejs': [
      { id: '1_асинхронность.md', title: 'Асинхронность', image: '/assets/images/documents/performance.svg' },
      { id: '2_event_Loop_and_etc.md', title: 'Event Loop and Concurrency', image: '/assets/images/documents/performance.svg' },
      { id: '3_solid.md', title: 'SOLID Principles', image: '/assets/images/documents/architecture.svg' },
      { id: '4_общее.md', title: 'Общее', image: '/assets/images/documents/general.svg' }
    ],
    '9_алгоритмы': [
      { id: '1_общее.md', title: 'Общее', image: '/assets/images/documents/general.svg' },
      { id: '2_что_такое_сложность.md', title: 'Что такое сложность', image: '/assets/images/documents/concepts.svg' },
      { id: '3_алгоритмы_и_задачи_обзор.md', title: 'Алгоритмы и задачи обзор', image: '/assets/images/documents/concepts.svg' },
      { id: '4_примеры_задач.md', title: 'Примеры задач', image: '/assets/images/documents/concepts.svg' }
    ],
    '10_system_design': [
      { id: '1_общее.md', title: 'Общее', image: '/assets/images/documents/general.svg' },
      { id: '2_требования_и_масштабируемость.md', title: 'Требования и масштабируемость', image: '/assets/images/documents/architecture.svg' },
      { id: '3_api_gateway_bff.md', title: 'API Gateway BFF', image: '/assets/images/documents/architecture.svg' },
      { id: '4_базы_данных_и_storage.md', title: 'Базы данных и storage', image: '/assets/images/documents/database.svg' },
      { id: '5_кэширование.md', title: 'Кэширование', image: '/assets/images/documents/performance.svg' },
      { id: '6_очереди_и_асинхронность.md', title: 'Очереди и асинхронность', image: '/assets/images/documents/performance.svg' },
      { id: '7_load_balancing_и_scaling.md', title: 'Load balancing и scaling', image: '/assets/images/documents/performance.svg' },
      { id: '8_sharding_и_partitioning.md', title: 'Sharding и partitioning', image: '/assets/images/documents/database.svg' },
      { id: '9_consistency_и_transactions.md', title: 'Consistency и transactions', image: '/assets/images/documents/database.svg' },
      { id: '10_search_или_indexing.md', title: 'Search или indexing', image: '/assets/images/documents/database.svg' },
      { id: '11_monitoring_или_observability.md', title: 'Monitoring или observability', image: '/assets/images/documents/performance.svg' },
      { id: '12_high_level_architecture_patterns.md', title: 'High level architecture patterns', image: '/assets/images/documents/architecture.svg' },
      { id: '13_security_и_reliability.md', title: 'Security и reliability', image: '/assets/images/documents/architecture.svg' },
      { id: '14_примеры_реальных_вопросов_на_собесе.md', title: 'Примеры реальных вопросов на собесе', image: '/assets/images/documents/general.svg' },
      { id: '15_что_точно_проверят_сеньору.md', title: 'Что точно проверят сеньору', image: '/assets/images/documents/general.svg' }
    ]
  };
};
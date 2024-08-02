import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    singularName: 'release';
    pluralName: 'releases';
    displayName: 'Release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    scheduledAt: Attribute.DateTime;
    timezone: Attribute.String;
    status: Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Attribute.Required;
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    singularName: 'release-action';
    pluralName: 'release-actions';
    displayName: 'Release Action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    contentType: Attribute.String & Attribute.Required;
    locale: Attribute.String;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    isEntryValid: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<
        {
          min: 1;
          max: 50;
        },
        number
      >;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCoachingPlanCardCoachingPlanCard
  extends Schema.CollectionType {
  collectionName: 'coaching_plan_cards';
  info: {
    singularName: 'coaching-plan-card';
    pluralName: 'coaching-plan-cards';
    displayName: 'Coaching Plan Card';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    price: Attribute.Integer;
    billingType: Attribute.String;
    billingDescription: Attribute.String;
    backgroundImage: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    titleLogo: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    showCard: Attribute.Boolean;
    features: Attribute.Relation<
      'api::coaching-plan-card.coaching-plan-card',
      'oneToMany',
      'api::coaching-plan-feature.coaching-plan-feature'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::coaching-plan-card.coaching-plan-card',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::coaching-plan-card.coaching-plan-card',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCoachingPlanCardTableCoachingPlanCardTable
  extends Schema.CollectionType {
  collectionName: 'coaching_plan_card_tables';
  info: {
    singularName: 'coaching-plan-card-table';
    pluralName: 'coaching-plan-card-tables';
    displayName: 'Coaching Plan Card Table';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    items: Attribute.Relation<
      'api::coaching-plan-card-table.coaching-plan-card-table',
      'oneToMany',
      'api::coaching-plan-card-table-item.coaching-plan-card-table-item'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::coaching-plan-card-table.coaching-plan-card-table',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::coaching-plan-card-table.coaching-plan-card-table',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCoachingPlanCardTableItemCoachingPlanCardTableItem
  extends Schema.CollectionType {
  collectionName: 'coaching_plan_card_table_items';
  info: {
    singularName: 'coaching-plan-card-table-item';
    pluralName: 'coaching-plan-card-table-items';
    displayName: 'Coaching Plan Card Table Item';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    label: Attribute.String;
    onlyRing: Attribute.Boolean;
    ringAndCoaching: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::coaching-plan-card-table-item.coaching-plan-card-table-item',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::coaching-plan-card-table-item.coaching-plan-card-table-item',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCoachingPlanFeatureCoachingPlanFeature
  extends Schema.CollectionType {
  collectionName: 'coaching_plan_features';
  info: {
    singularName: 'coaching-plan-feature';
    pluralName: 'coaching-plan-features';
    displayName: 'Coaching Plan Feature';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    feature: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::coaching-plan-feature.coaching-plan-feature',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::coaching-plan-feature.coaching-plan-feature',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiConsumerProtectionConsumerProtection
  extends Schema.CollectionType {
  collectionName: 'consumer_protections';
  info: {
    singularName: 'consumer-protection';
    pluralName: 'consumer-protections';
    displayName: 'Consumer Protection';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    cards: Attribute.Relation<
      'api::consumer-protection.consumer-protection',
      'oneToMany',
      'api::consumer-protection-list.consumer-protection-list'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::consumer-protection.consumer-protection',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::consumer-protection.consumer-protection',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiConsumerProtectionListConsumerProtectionList
  extends Schema.CollectionType {
  collectionName: 'consumer_protection_lists';
  info: {
    singularName: 'consumer-protection-list';
    pluralName: 'consumer-protection-lists';
    displayName: 'Consumer Protection Card';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    items: Attribute.Relation<
      'api::consumer-protection-list.consumer-protection-list',
      'oneToMany',
      'api::consumer-protection-list-item.consumer-protection-list-item'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::consumer-protection-list.consumer-protection-list',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::consumer-protection-list.consumer-protection-list',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiConsumerProtectionListItemConsumerProtectionListItem
  extends Schema.CollectionType {
  collectionName: 'consumer_protection_list_items';
  info: {
    singularName: 'consumer-protection-list-item';
    pluralName: 'consumer-protection-list-items';
    displayName: 'Consumer Protection List Item';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    label: Attribute.String;
    icon: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::consumer-protection-list-item.consumer-protection-list-item',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::consumer-protection-list-item.consumer-protection-list-item',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFaqFaq extends Schema.CollectionType {
  collectionName: 'faqs';
  info: {
    singularName: 'faq';
    pluralName: 'faqs';
    displayName: 'Faq';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    question: Attribute.String;
    answer: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::faq.faq', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::faq.faq', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiFooterFooter extends Schema.SingleType {
  collectionName: 'footers';
  info: {
    singularName: 'footer';
    pluralName: 'footers';
    displayName: 'Footer';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    accordions: Attribute.Relation<
      'api::footer.footer',
      'oneToMany',
      'api::footer-accordion.footer-accordion'
    >;
    rightReserved: Attribute.String;
    socialLinks: Attribute.Relation<
      'api::footer.footer',
      'oneToMany',
      'api::social-icon-link.social-icon-link'
    >;
    footeLinks: Attribute.Relation<
      'api::footer.footer',
      'oneToMany',
      'api::footer-link.footer-link'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::footer.footer',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::footer.footer',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFooterAccordionFooterAccordion
  extends Schema.CollectionType {
  collectionName: 'footer_accordions';
  info: {
    singularName: 'footer-accordion';
    pluralName: 'footer-accordions';
    displayName: 'Footer Accordion';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    question: Attribute.String;
    answer: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::footer-accordion.footer-accordion',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::footer-accordion.footer-accordion',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFooterLinkFooterLink extends Schema.CollectionType {
  collectionName: 'footer_links';
  info: {
    singularName: 'footer-link';
    pluralName: 'footer-links';
    displayName: 'Footer Link';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    heading: Attribute.String;
    tag: Attribute.String;
    to: Attribute.String;
    isExternal: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::footer-link.footer-link',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::footer-link.footer-link',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiLandingPageLandingPage extends Schema.SingleType {
  collectionName: 'landing_pages';
  info: {
    singularName: 'landing-page';
    pluralName: 'landing-pages';
    displayName: 'Landing Page';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    slideOneTitle: Attribute.String;
    slideThreeDescription: Attribute.Text;
    slideOneForegroundImages: Attribute.Media<'images', true>;
    slideOneBackgroundImages: Attribute.Media<'images', true>;
    slideOnePurchaseBtnText: Attribute.String;
    slideThreeTitle: Attribute.String;
    slideThreeClockText: Attribute.String;
    slideThreeCard: Attribute.Relation<
      'api::landing-page.landing-page',
      'oneToOne',
      'api::slide-three-card.slide-three-card'
    >;
    slideFourTitle: Attribute.String;
    slideFourDescription: Attribute.Text;
    slideFourCard: Attribute.Relation<
      'api::landing-page.landing-page',
      'oneToOne',
      'api::slide-4-card.slide-4-card'
    >;
    slideThreeBackgroundImage: Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    slideFourBackgroundImage: Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    slideFiveTitle: Attribute.String;
    slideFiveBackgroundImage: Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    slideFiveLottieFile: Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    slideFiveCard: Attribute.Relation<
      'api::landing-page.landing-page',
      'oneToOne',
      'api::slide-five-card.slide-five-card'
    >;
    slideSixTitle: Attribute.String;
    slideSixDescription: Attribute.Text;
    slideSixCards: Attribute.Relation<
      'api::landing-page.landing-page',
      'oneToMany',
      'api::slide-six-card.slide-six-card'
    >;
    slideSixSmallCards: Attribute.Relation<
      'api::landing-page.landing-page',
      'oneToMany',
      'api::slide-six-small-card.slide-six-small-card'
    >;
    slideSevenPurchaseBtnText: Attribute.String;
    slideSevenCards: Attribute.Relation<
      'api::landing-page.landing-page',
      'oneToMany',
      'api::slide-seven-card.slide-seven-card'
    >;
    slideSevenIcon: Attribute.Relation<
      'api::landing-page.landing-page',
      'oneToMany',
      'api::slide-seven-icon.slide-seven-icon'
    >;
    slideSevenBackgroundImage: Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    slideEightTitle: Attribute.String;
    slideEightDescription: Attribute.Text;
    slideEightLottieFile: Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    slideEightFeatures: Attribute.Relation<
      'api::landing-page.landing-page',
      'oneToMany',
      'api::specification.specification'
    >;
    slideEightPurchaseBtnText: Attribute.String;
    slideTwoTitle: Attribute.String;
    slideTwoDescription: Attribute.String;
    slideTwoPurchaseBtnText: Attribute.String;
    slideTwoCards: Attribute.Relation<
      'api::landing-page.landing-page',
      'oneToMany',
      'api::slide-two-card.slide-two-card'
    >;
    faqs: Attribute.Relation<
      'api::landing-page.landing-page',
      'oneToMany',
      'api::faq.faq'
    >;
    slideOneDescription: Attribute.Text;
    slideThreeMobileBackgroundImage: Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    slideFourMobileBackgroundImage: Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    slideFiveMobileBackgroundImage: Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    slideSevenMobileBackgroundImage: Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    consumerProtection: Attribute.Relation<
      'api::landing-page.landing-page',
      'oneToOne',
      'api::consumer-protection.consumer-protection'
    >;
    slideSevenTitles: Attribute.Relation<
      'api::landing-page.landing-page',
      'oneToMany',
      'api::slide-seven-title.slide-seven-title'
    >;
    slideSevenDescriptions: Attribute.Relation<
      'api::landing-page.landing-page',
      'oneToMany',
      'api::slide-seven-description.slide-seven-description'
    >;
    slideFourSmallCards: Attribute.Relation<
      'api::landing-page.landing-page',
      'oneToMany',
      'api::slide-4-small-card.slide-4-small-card'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::landing-page.landing-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::landing-page.landing-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiMeasureWithFingerGuideMeasureWithFingerGuide
  extends Schema.CollectionType {
  collectionName: 'measure_with_finger_guides';
  info: {
    singularName: 'measure-with-finger-guide';
    pluralName: 'measure-with-finger-guides';
    displayName: 'Measure With Finger Guide';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    measureWithFingerSteps: Attribute.Relation<
      'api::measure-with-finger-guide.measure-with-finger-guide',
      'oneToMany',
      'api::measure-with-finger-step.measure-with-finger-step'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::measure-with-finger-guide.measure-with-finger-guide',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::measure-with-finger-guide.measure-with-finger-guide',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiMeasureWithFingerStepMeasureWithFingerStep
  extends Schema.CollectionType {
  collectionName: 'measure_with_finger_steps';
  info: {
    singularName: 'measure-with-finger-step';
    pluralName: 'measure-with-finger-steps';
    displayName: 'Measure With Finger Step';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    media: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    measure_with_finger_guide: Attribute.Relation<
      'api::measure-with-finger-step.measure-with-finger-step',
      'manyToOne',
      'api::measure-with-finger-guide.measure-with-finger-guide'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::measure-with-finger-step.measure-with-finger-step',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::measure-with-finger-step.measure-with-finger-step',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPhysicalSizingCardPhysicalSizingCard
  extends Schema.CollectionType {
  collectionName: 'physical_sizing_cards';
  info: {
    singularName: 'physical-sizing-card';
    pluralName: 'physical-sizing-cards';
    displayName: 'Physical Sizing Card';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.String;
    buttonText: Attribute.String;
    showCard: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::physical-sizing-card.physical-sizing-card',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::physical-sizing-card.physical-sizing-card',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPolicyPolicy extends Schema.SingleType {
  collectionName: 'policies';
  info: {
    singularName: 'policy';
    pluralName: 'policies';
    displayName: 'policy';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    updated_on: Attribute.String;
    content: Attribute.Blocks;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::policy.policy',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::policy.policy',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProductPageProductPage extends Schema.SingleType {
  collectionName: 'product_pages';
  info: {
    singularName: 'product-page';
    pluralName: 'product-pages';
    displayName: 'Product Page';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    coachingPlanCard: Attribute.Relation<
      'api::product-page.product-page',
      'oneToOne',
      'api::coaching-plan-card.coaching-plan-card'
    >;
    featureIcons: Attribute.Relation<
      'api::product-page.product-page',
      'oneToMany',
      'api::product-page-feature-icon.product-page-feature-icon'
    >;
    threeSixtyModel: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    physicalSizingCard: Attribute.Relation<
      'api::product-page.product-page',
      'oneToOne',
      'api::physical-sizing-card.physical-sizing-card'
    >;
    ringImages: Attribute.Relation<
      'api::product-page.product-page',
      'oneToMany',
      'api::product-page-ring-media.product-page-ring-media'
    >;
    recentlySold: Attribute.Relation<
      'api::product-page.product-page',
      'oneToOne',
      'api::product-page-recently-sold-tip.product-page-recently-sold-tip'
    >;
    coachingPlanTable: Attribute.Relation<
      'api::product-page.product-page',
      'oneToOne',
      'api::coaching-plan-card-table.coaching-plan-card-table'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::product-page.product-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::product-page.product-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProductPageFeatureIconProductPageFeatureIcon
  extends Schema.CollectionType {
  collectionName: 'product_page_feature_icons';
  info: {
    singularName: 'product-page-feature-icon';
    pluralName: 'product-page-feature-icons';
    displayName: 'Product Page Feature Icon';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    media: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::product-page-feature-icon.product-page-feature-icon',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::product-page-feature-icon.product-page-feature-icon',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProductPageRecentlySoldTipProductPageRecentlySoldTip
  extends Schema.CollectionType {
  collectionName: 'product_page_recently_sold_tips';
  info: {
    singularName: 'product-page-recently-sold-tip';
    pluralName: 'product-page-recently-sold-tips';
    displayName: 'Product Page Recently Sold Tip';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    logo: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::product-page-recently-sold-tip.product-page-recently-sold-tip',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::product-page-recently-sold-tip.product-page-recently-sold-tip',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProductPageRingColorListProductPageRingColorList
  extends Schema.CollectionType {
  collectionName: 'product_page_ring_color_lists';
  info: {
    singularName: 'product-page-ring-color-list';
    pluralName: 'product-page-ring-color-lists';
    displayName: 'Product Page Ring Color List';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    colorName: Attribute.String;
    colorHex: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::product-page-ring-color-list.product-page-ring-color-list',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::product-page-ring-color-list.product-page-ring-color-list',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProductPageRingMediaProductPageRingMedia
  extends Schema.CollectionType {
  collectionName: 'product_page_ring_medias';
  info: {
    singularName: 'product-page-ring-media';
    pluralName: 'product-page-ring-medias';
    displayName: 'Product Page Ring Media';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    colorName: Attribute.String;
    colorCode: Attribute.String;
    media: Attribute.Media<'images' | 'files' | 'videos' | 'audios', true>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::product-page-ring-media.product-page-ring-media',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::product-page-ring-media.product-page-ring-media',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiRingSizeRingSize extends Schema.CollectionType {
  collectionName: 'ring_sizes';
  info: {
    singularName: 'ring-size';
    pluralName: 'ring-sizes';
    displayName: 'Ring Size';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    size: Attribute.Integer;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::ring-size.ring-size',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::ring-size.ring-size',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSlide4CardSlide4Card extends Schema.CollectionType {
  collectionName: 'slide-4-cards';
  info: {
    singularName: 'slide-4-card';
    pluralName: 'slide-4-cards';
    displayName: 'Slide Four Card';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    media: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    titleHex: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::slide-4-card.slide-4-card',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::slide-4-card.slide-4-card',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSlide4SmallCardSlide4SmallCard
  extends Schema.CollectionType {
  collectionName: 'slide-4-small-cards';
  info: {
    singularName: 'slide-4-small-card';
    pluralName: 'slide-4-small-cards';
    displayName: 'Slide Four Small Cards';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.String;
    media: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::slide-4-small-card.slide-4-small-card',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::slide-4-small-card.slide-4-small-card',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSlideFiveCardSlideFiveCard extends Schema.CollectionType {
  collectionName: 'slide_five_cards';
  info: {
    singularName: 'slide-five-card';
    pluralName: 'slide-five-cards';
    displayName: 'Slide Five Card';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    media: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    titleHex: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::slide-five-card.slide-five-card',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::slide-five-card.slide-five-card',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSlideSevenCardSlideSevenCard extends Schema.CollectionType {
  collectionName: 'slide_seven_cards';
  info: {
    singularName: 'slide-seven-card';
    pluralName: 'slide-seven-cards';
    displayName: 'Slide Seven Card';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    media: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    subTitle: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::slide-seven-card.slide-seven-card',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::slide-seven-card.slide-seven-card',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSlideSevenDescriptionSlideSevenDescription
  extends Schema.CollectionType {
  collectionName: 'slide_seven_descriptions';
  info: {
    singularName: 'slide-seven-description';
    pluralName: 'slide-seven-descriptions';
    displayName: 'Slide Seven Description';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    description: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::slide-seven-description.slide-seven-description',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::slide-seven-description.slide-seven-description',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSlideSevenIconSlideSevenIcon extends Schema.CollectionType {
  collectionName: 'slide_seven_icons';
  info: {
    singularName: 'slide-seven-icon';
    pluralName: 'slide-seven-icons';
    displayName: 'Slide Seven Icon';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    initialImage: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    finalImage: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::slide-seven-icon.slide-seven-icon',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::slide-seven-icon.slide-seven-icon',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSlideSevenTitleSlideSevenTitle
  extends Schema.CollectionType {
  collectionName: 'slide_seven_titles';
  info: {
    singularName: 'slide-seven-title';
    pluralName: 'slide-seven-titles';
    displayName: 'Slide Seven Title';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::slide-seven-title.slide-seven-title',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::slide-seven-title.slide-seven-title',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSlideSixCardSlideSixCard extends Schema.CollectionType {
  collectionName: 'slide_six_cards';
  info: {
    singularName: 'slide-six-card';
    pluralName: 'slide-six-cards';
    displayName: 'Slide Six Card';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    cardNo: Attribute.Integer;
    description: Attribute.Text;
    media: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::slide-six-card.slide-six-card',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::slide-six-card.slide-six-card',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSlideSixSmallCardSlideSixSmallCard
  extends Schema.CollectionType {
  collectionName: 'slide_six_small_cards';
  info: {
    singularName: 'slide-six-small-card';
    pluralName: 'slide-six-small-cards';
    displayName: 'Slide Six Small Card';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    media: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::slide-six-small-card.slide-six-small-card',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::slide-six-small-card.slide-six-small-card',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSlideThreeCardSlideThreeCard extends Schema.CollectionType {
  collectionName: 'slide_three_cards';
  info: {
    singularName: 'slide-three-card';
    pluralName: 'slide-three-cards';
    displayName: 'Slide Three Card';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.String;
    media: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    titleHex: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::slide-three-card.slide-three-card',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::slide-three-card.slide-three-card',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSlideTwoCardSlideTwoCard extends Schema.CollectionType {
  collectionName: 'slide_two_cards';
  info: {
    singularName: 'slide-two-card';
    pluralName: 'slide-two-cards';
    displayName: 'Slide Two Card';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    media: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    comment: Attribute.Text;
    feedback: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::slide-two-card.slide-two-card',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::slide-two-card.slide-two-card',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSocialIconLinkSocialIconLink extends Schema.CollectionType {
  collectionName: 'social_icon_links';
  info: {
    singularName: 'social-icon-link';
    pluralName: 'social-icon-links';
    displayName: 'Social Icon Link';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    icon: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    url: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::social-icon-link.social-icon-link',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::social-icon-link.social-icon-link',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSpecificationSpecification extends Schema.CollectionType {
  collectionName: 'specifications';
  info: {
    singularName: 'specification';
    pluralName: 'specifications';
    displayName: 'Slide Eight Specification';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.String;
    subDescription: Attribute.String;
    tag: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::specification.specification',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::specification.specification',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTermsAndConditionTermsAndCondition
  extends Schema.SingleType {
  collectionName: 'terms_and_conditions';
  info: {
    singularName: 'terms-and-condition';
    pluralName: 'terms-and-conditions';
    displayName: 'Terms and Condition';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    content: Attribute.Blocks;
    updated_on: Attribute.String;
    title: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::terms-and-condition.terms-and-condition',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::terms-and-condition.terms-and-condition',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiWarrantyCardWarrantyCard extends Schema.CollectionType {
  collectionName: 'warranty_cards';
  info: {
    singularName: 'warranty-card';
    pluralName: 'warranty-cards';
    displayName: 'Warranty Card';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    heading: Attribute.String;
    largeHeading: Attribute.String;
    media: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    description: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::warranty-card.warranty-card',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::warranty-card.warranty-card',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiWarrantyPolicyWarrantyPolicy extends Schema.SingleType {
  collectionName: 'warranty_policies';
  info: {
    singularName: 'warranty-policy';
    pluralName: 'warranty-policies';
    displayName: 'Warranty Policy';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    updatedOn: Attribute.String;
    warrantyCard: Attribute.Relation<
      'api::warranty-policy.warranty-policy',
      'oneToOne',
      'api::warranty-card.warranty-card'
    >;
    warrantyPolicySmallCards: Attribute.Relation<
      'api::warranty-policy.warranty-policy',
      'oneToMany',
      'api::warranty-policy-small-card.warranty-policy-small-card'
    >;
    content: Attribute.Blocks;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::warranty-policy.warranty-policy',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::warranty-policy.warranty-policy',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiWarrantyPolicySmallCardWarrantyPolicySmallCard
  extends Schema.CollectionType {
  collectionName: 'warranty_policy_small_cards';
  info: {
    singularName: 'warranty-policy-small-card';
    pluralName: 'warranty-policy-small-cards';
    displayName: 'Warranty Policy Small Card';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    media: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Attribute.String;
    description: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::warranty-policy-small-card.warranty-policy-small-card',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::warranty-policy-small-card.warranty-policy-small-card',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'api::coaching-plan-card.coaching-plan-card': ApiCoachingPlanCardCoachingPlanCard;
      'api::coaching-plan-card-table.coaching-plan-card-table': ApiCoachingPlanCardTableCoachingPlanCardTable;
      'api::coaching-plan-card-table-item.coaching-plan-card-table-item': ApiCoachingPlanCardTableItemCoachingPlanCardTableItem;
      'api::coaching-plan-feature.coaching-plan-feature': ApiCoachingPlanFeatureCoachingPlanFeature;
      'api::consumer-protection.consumer-protection': ApiConsumerProtectionConsumerProtection;
      'api::consumer-protection-list.consumer-protection-list': ApiConsumerProtectionListConsumerProtectionList;
      'api::consumer-protection-list-item.consumer-protection-list-item': ApiConsumerProtectionListItemConsumerProtectionListItem;
      'api::faq.faq': ApiFaqFaq;
      'api::footer.footer': ApiFooterFooter;
      'api::footer-accordion.footer-accordion': ApiFooterAccordionFooterAccordion;
      'api::footer-link.footer-link': ApiFooterLinkFooterLink;
      'api::landing-page.landing-page': ApiLandingPageLandingPage;
      'api::measure-with-finger-guide.measure-with-finger-guide': ApiMeasureWithFingerGuideMeasureWithFingerGuide;
      'api::measure-with-finger-step.measure-with-finger-step': ApiMeasureWithFingerStepMeasureWithFingerStep;
      'api::physical-sizing-card.physical-sizing-card': ApiPhysicalSizingCardPhysicalSizingCard;
      'api::policy.policy': ApiPolicyPolicy;
      'api::product-page.product-page': ApiProductPageProductPage;
      'api::product-page-feature-icon.product-page-feature-icon': ApiProductPageFeatureIconProductPageFeatureIcon;
      'api::product-page-recently-sold-tip.product-page-recently-sold-tip': ApiProductPageRecentlySoldTipProductPageRecentlySoldTip;
      'api::product-page-ring-color-list.product-page-ring-color-list': ApiProductPageRingColorListProductPageRingColorList;
      'api::product-page-ring-media.product-page-ring-media': ApiProductPageRingMediaProductPageRingMedia;
      'api::ring-size.ring-size': ApiRingSizeRingSize;
      'api::slide-4-card.slide-4-card': ApiSlide4CardSlide4Card;
      'api::slide-4-small-card.slide-4-small-card': ApiSlide4SmallCardSlide4SmallCard;
      'api::slide-five-card.slide-five-card': ApiSlideFiveCardSlideFiveCard;
      'api::slide-seven-card.slide-seven-card': ApiSlideSevenCardSlideSevenCard;
      'api::slide-seven-description.slide-seven-description': ApiSlideSevenDescriptionSlideSevenDescription;
      'api::slide-seven-icon.slide-seven-icon': ApiSlideSevenIconSlideSevenIcon;
      'api::slide-seven-title.slide-seven-title': ApiSlideSevenTitleSlideSevenTitle;
      'api::slide-six-card.slide-six-card': ApiSlideSixCardSlideSixCard;
      'api::slide-six-small-card.slide-six-small-card': ApiSlideSixSmallCardSlideSixSmallCard;
      'api::slide-three-card.slide-three-card': ApiSlideThreeCardSlideThreeCard;
      'api::slide-two-card.slide-two-card': ApiSlideTwoCardSlideTwoCard;
      'api::social-icon-link.social-icon-link': ApiSocialIconLinkSocialIconLink;
      'api::specification.specification': ApiSpecificationSpecification;
      'api::terms-and-condition.terms-and-condition': ApiTermsAndConditionTermsAndCondition;
      'api::warranty-card.warranty-card': ApiWarrantyCardWarrantyCard;
      'api::warranty-policy.warranty-policy': ApiWarrantyPolicyWarrantyPolicy;
      'api::warranty-policy-small-card.warranty-policy-small-card': ApiWarrantyPolicySmallCardWarrantyPolicySmallCard;
    }
  }
}
